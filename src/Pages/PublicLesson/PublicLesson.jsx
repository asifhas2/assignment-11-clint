import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import LessonSkeleton from "../../Components/LessonSkeleton";

const PublicLessons = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  const itemsPerPage = 8;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ================= USER API =================
  const { data: users } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // ================= LESSON API =================
  const { data = {}, isLoading } = useQuery({
    queryKey: ["lesson", search, category, tone, sort, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", {
        params: {
          search,
          category,
          tone,
          sort,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      return res.data;
    },
  });
console.log(data);
  const lessonss = data?.lessons || [];
  console.log(lessonss);
  const totalPages = data?.totalPages || 1;

  // ================= MEMOIZED FILTER OPTIONS =================
  const categories = useMemo(
    () => [...new Set(lessonss.map((item) => item.category))],
    [lessonss]
  );

  const tones = useMemo(
    () => [...new Set(lessonss.map((item) => item.tone))],
    [lessonss]
  );

  // ================= RESET PAGE ON FILTER CHANGE =================
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, tone, sort]);

  // ================= TEXT SHORTENER =================
  const shortText = (text, limit = 90) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div>
      {/* ================= FILTER SECTION ================= */}
      <div className="bg-base-200 p-6 rounded-xl mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search lessons..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="">All Tones</option>
            {tones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="reactions">Most Liked</option>
            <option value="saves">Most Saved</option>
          </select>
        </div>
      </div>

      {/* ================= LESSON GRID ================= */}
      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-screen">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <LessonSkeleton key={i} />
          ))}

        {!isLoading &&
          data.map((lesson, index) => {
            const isLocked =
              lesson.access === "premium" &&
              users &&
              users.plan !== "premium";

            const isExpanded = expandedId === lesson._id;

            return (
              <motion.div
                key={lesson._id || index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative bg-base-100 rounded-2xl shadow-md overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative">
                  <motion.img
                    src={lesson.image || "https://via.placeholder.com/400"}
                    className="h-44 w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* CONTENT */}
                <div
                  className={`p-4 ${
                    isLocked ? "blur-sm pointer-events-none" : ""
                  }`}
                >
                  <h2 className="text-lg font-bold">{lesson.title}</h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {isExpanded
                      ? lesson.description
                      : shortText(lesson.description)}
                  </p>

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
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                      {lesson.category}
                    </span>

                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                      {lesson.tone}
                    </span>

                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                      {lesson.access}
                    </span>
                  </div>

                  {/* CREATOR */}
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={lesson.creatorPhoto}
                      className="w-10 h-10 rounded-full"
                      alt="creator"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {lesson.creatorName}
                      </p>
                      <p className="text-xs text-gray-400">
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
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-10">
                    <FaLock className="text-4xl mb-2" />
                    <p className="font-bold text-lg">Premium Lesson</p>
                    <p className="text-sm mb-3 text-center px-4">
                      Upgrade to unlock full content
                    </p>

                    <Link
                      to="/upgrade"
                      className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-10">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`btn ${
              currentPage === page + 1 ? "btn-primary" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PublicLessons;