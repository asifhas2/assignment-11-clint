import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {data:users}=useQuery({
    queryKey:['users',user?.email],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/users/${user?.email}`)
        return res.data;
    }
  })

  const { data = [] } = useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 min-h-screen">
      {data.map((lesson, index) => {
        const isLocked =
          lesson.access === "premium" &&
          users?.plan !== "premium";

        return (
          <motion.div
            key={lesson._id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-base-100 shadow-xl relative overflow-hidden"
          >
            {/* Blur Content when locked */}
            <div className={isLocked ? "blur-sm pointer-events-none" : ""}>
              <div className="card-body">
                <h2 className="card-title">{lesson.title}</h2>

                <p className="text-sm opacity-70">
                  {lesson.description?.slice(0, 80)}...
                </p>

                <div className="flex gap-2 flex-wrap mt-2">
                  <span className="badge badge-primary">
                    {lesson.category}
                  </span>
                  <span className="badge badge-secondary">
                    {lesson.tone}
                  </span>
                  <span
                    className={`badge ${
                      lesson.access === "premium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {lesson.access}
                  </span>
                </div>

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
                    <p className="text-xs opacity-60">
                      {lesson.createdAt}
                    </p>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={
                      isLocked
                        ? "/upgrade"
                        : `/public-lessons/${lesson._id}`
                    }
                    className={`btn btn-primary btn-sm ${
                      isLocked ? "opacity-50" : ""
                    }`}
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Lock Overlay */}
            {isLocked && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white z-10">
                <FaLock className="text-4xl mb-2" />
                <p className="font-bold text-lg">
                  Premium Lesson
                </p>
                <p className="text-sm mb-3">
                  Upgrade to view full content
                </p>

                <Link
                  to="/upgrade"
                 className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300"
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