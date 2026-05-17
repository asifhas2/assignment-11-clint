import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "./src/Hooks/useAxiosSecure";

export function TopContributors() {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">
        🏆 Top Contributors of the Week
      </h2>

      <div className="grid gap-3">
        {data?.slice(0, 3).map((user, index) => {
          const randomPoints = Math.floor(Math.random() * 1000);

          return (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />

                <div>
                  <p className="font-semibold">
                    {user.displayName}
                  </p>

                  <p className="text-sm text-gray-500">
                    Weekly Points
                  </p>
                </div>
              </div>

              <span className="font-bold text-blue-500">
                {randomPoints}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}