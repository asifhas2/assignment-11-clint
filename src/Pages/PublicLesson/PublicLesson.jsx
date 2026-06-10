import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import LessonSkeleton from "../../Components/LessonSkeleton";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [expandedId, setExpandedId] = useState(null);

  // USER API
  const { data: users } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // LESSON API
  const { data = [], isLoading } = useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  const shortText = (text, limit = 90) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 bg-background min-h-screen text-foreground">

      {/* ================= SKELETON LOADER ================= */}
      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => (
          <LessonSkeleton key={i} />
        ))}

      {/* ================= REAL DATA ================= */}
      {!isLoading &&
        data.map((lesson, index) => {
          const isLocked =
            lesson.access === "premium" &&
            users?.plan !== "premium";

          const isExpanded = expandedId === lesson._id;

          return (
            <motion.div
              key={lesson._id || index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative bg-card  rounded-2xl shadow-sm overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={lesson.image || "https://via.placeholder.com/400"}
                  className="h-44 w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className={`p-4 ${isLocked ? "blur-sm pointer-events-none" : ""}`}>

                {/* TITLE */}
                <h2 className="text-lg font-bold">
                  {lesson.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-muted-foreground mt-1">
                  {isExpanded
                    ? lesson.description
                    : shortText(lesson.description)}
                </p>

                {/* READ MORE */}
                {lesson.description?.length > 90 && (
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : lesson._id)
                    }
                    className="text-indigo-500 text-sm mt-1 hover:underline"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}

                {/* BADGES */}
                <div className="flex gap-2 flex-wrap mt-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-500">
                    {lesson.category}
                  </span>

                  <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-500">
                    {lesson.tone}
                  </span>

                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500">
                    {lesson.access}
                  </span>
                </div>

                {/* CREATOR */}
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={lesson.creatorPhoto}
                    className="w-10 h-10 rounded-full border border-border"
                    alt="creator"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      {lesson.creatorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.createdAt}
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="mt-4">
                  <Link
                    to={
                      isLocked
                        ? "/upgrade"
                        : `/public-lessons/${lesson._id}`
                    }
                    className="btn btn-sm w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    See Details
                  </Link>
                </div>

              </div>

              {/* LOCK OVERLAY */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10">

                  <FaLock className="text-4xl mb-2" />

                  <p className="font-bold text-lg">
                    Premium Lesson
                  </p>

                  <p className="text-sm mb-3 text-center px-4">
                    Upgrade to unlock full content
                  </p>

                  <Link
                    to="/upgrade"
                    className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 hover:scale-105 transition"
                  >
                    Upgrade Now
                  </Link>
                </div>
              )}

            </motion.div>
          );
        })}
    </div>
  );
};

export default PublicLessons;