import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaCrown, FaMedal, FaFire } from "react-icons/fa";
import useAxiosSecure from "./src/Hooks/useAxiosSecure";

export function TopContributors() {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Add fake weekly points
  const usersWithPoints = data
    ?.map((user) => ({
      ...user,
      points: Math.floor(Math.random() * 1000) + 100,
    }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const medals = [
    <FaCrown className="text-yellow-400 text-xl" />,
    <FaMedal className="text-gray-400 text-xl" />,
    <FaMedal className="text-orange-400 text-xl" />,
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="my-10">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold">
          🏆 Top Contributors
        </h2>

        <p className="text-gray-500 mt-2">
          Most active community members this week
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {usersWithPoints.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 p-6"
          >
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

            {/* Rank */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                {medals[index]}

                <span className="font-bold text-lg">
                  #{index + 1}
                </span>
              </div>

              <div className="flex items-center gap-1 text-orange-500 font-semibold">
                <FaFire />
                {user.points}
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center text-center">
              <motion.img
                whileHover={{ rotate: 5, scale: 1.08 }}
                src={user.photoURL}
                alt={user.displayName}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md"
              />

              <h3 className="mt-4 text-xl font-bold">
                {user.displayName}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Top Community Contributor
              </p>

              {/* Progress */}
              <div className="w-full mt-5">
                <div className="flex justify-between text-sm mb-1">
                  <span>Activity</span>
                  <span>{user.points}/1000</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${user.points / 10}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.4,
                    }}
                    className="bg-blue-500 h-3 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}