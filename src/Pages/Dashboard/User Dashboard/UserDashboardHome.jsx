import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBookOpen,
  FaHeart,
  FaPlusCircle,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const UserDashboardHome = () => {
      const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // my lessons
  const { data: lessons = [] } = useQuery({
     queryKey: ["lesson", user?.email],
     queryFn: async () => {
       const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
       return res.data;
     },
   });

  // favorite lessons
   const { data: favorites = [] } = useQuery({
    queryKey: ["favorite", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/favorite?email=${user.email}`,
      );
      return res.data;
    },
  });

  // recent lessons
  const recentLessons = [...lessons]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  // chart data
  const chartData = lessons.slice(0, 7).map((lesson, index) => ({
    name: `Day ${index + 1}`,
    lessons: index + 1,
  }));
    return (
        <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      {/* heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Track your lessons, favorites, and activity
        </p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* total lessons */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-primary text-primary-content shadow-xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  Total Lessons
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {lessons.length}
                </p>
              </div>

              <FaBookOpen className="text-5xl opacity-80" />
            </div>
          </div>
        </motion.div>

        {/* favorites */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-secondary text-secondary-content shadow-xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  Saved Lessons
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {favorites.length}
                </p>
              </div>

              <FaHeart className="text-5xl opacity-80" />
            </div>
          </div>
        </motion.div>

        {/* quick action */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-accent text-accent-content shadow-xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  Create Lesson
                </h2>

                <Link
                  to="/dashboard/add-lesson"
                  className="btn btn-sm btn-neutral mt-4"
                >
                  Add Now
                </Link>
              </div>

              <FaPlusCircle className="text-5xl opacity-80" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* chart + recent lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* analytics chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <FaChartLine />
              Weekly Contributions
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="lessons"
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* recent lessons */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">
                Recently Added Lessons
              </h2>

              <Link
                to="/dashboard/my-lessons"
                className="btn btn-sm btn-outline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="flex items-center justify-between p-4 rounded-xl bg-base-200"
                >
                  <div>
                    <h3 className="font-semibold">
                      {lesson.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {lesson.category}
                    </p>
                  </div>

                  <Link
                    to={`/public-lessons/${lesson._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    <FaArrowRight />
                  </Link>
                </div>
              ))}

              {!recentLessons.length && (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No lessons added yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* quick shortcuts */}
      <div className="card bg-base-100 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title mb-6">
            Quick Shortcuts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/dashboard/add-lesson"
              className="btn btn-primary h-20 text-lg"
            >
              Add Lesson
            </Link>

            <Link
              to="/dashboard/my-lessons"
              className="btn btn-secondary h-20 text-lg"
            >
              My Lessons
            </Link>

            <Link
              to="/dashboard/my-favorite"
              className="btn btn-accent h-20 text-lg"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
};

export default UserDashboardHome;