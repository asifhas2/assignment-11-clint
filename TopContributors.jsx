import { motion } from "framer-motion";

const contributors = [
  { id: 1, name: "Rahim", points: 120, avatar: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Sadia", points: 110, avatar: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Karim", points: 98, avatar: "https://i.pravatar.cc/100?img=3" },
];

export function TopContributors() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">🏆 Top Contributors of the Week</h2>

      <div className="grid gap-3">
        {contributors.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">Weekly Points</p>
              </div>
            </div>

            <span className="font-bold text-blue-500">
              {user.points}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}