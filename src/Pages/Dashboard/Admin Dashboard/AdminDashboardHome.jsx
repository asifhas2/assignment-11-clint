import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaFire,
  FaChartLine,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // dashboard stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manage-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await axiosSecure.get("/report");
      return res.data;
    },
  });

  //   console.log(lessons);

  //   console.log(users);

  // lesson growth chart
  const { data: lessonGrowth = [] } = useQuery({
    queryKey: ["lesson-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lesson-growth");
      return res.data;
    },
  });

  // user growth chart
  const { data: userGrowth = [] } = useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/user-growth");
      return res.data;
    },
  });

  // most active contributor

  const { data: topContributors = [] } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/top-contributors");

      return res.data;
    },
  });
  console.log(topContributors);
  //   state

  const publicLessons = lessons.filter(
    (lesson) => lesson.privacy === "public",
  ).length;
  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaChartLine className="text-primary" />
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor platform activity and analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-primary text-primary-content shadow-xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-4xl font-bold mt-2">{users.length || 0}</p>
              </div>

              <FaUsers className="text-5xl opacity-80" />
            </div>
          </div>
        </motion.div>

        {/* Public Lessons */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-secondary text-secondary-content shadow-xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Public Lessons</h2>

                <p className="text-4xl font-bold mt-2">{publicLessons}</p>
              </div>

              <FaBookOpen className="text-5xl opacity-80" />
            </div>
          </div>
        </motion.div>

        {/* Reported Lessons */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-error text-white shadow-xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Reported Lessons</h2>

                <p className="text-4xl font-bold mt-2">{reports.length || 0}</p>
              </div>

              <FaFlag className="text-5xl opacity-80" />
            </div>
          </div>
        </motion.div>

        {/* Today's Lessons */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-accent text-accent-content shadow-xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Today’s Lessons</h2>

                <p className="text-4xl font-bold mt-2">
                  {stats.todayLessons || 0}
                </p>
              </div>

              <FaFire className="text-5xl opacity-80" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Lesson Growth */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Lesson Growth</h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lessonGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Line type="monotone" dataKey="count" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">User Growth</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Most Active Contributors */}
      <div className="card bg-base-100 shadow-xl mt-10">
        <div className="card-body">
          <h2 className="card-title mb-6">Most Active Contributors</h2>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total Lessons</th>
                </tr>
              </thead>

              <tbody>
                {topContributors?.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>

                    <td>{user.creatorName}</td>

                    <td>{user.creatorEmail}</td>

                    <td>
                      <span className="badge badge-primary">
                        {user.totalLessons}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!stats.topContributors?.length && (
              <p className="text-center py-6 text-gray-500">
                No contributor data found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
