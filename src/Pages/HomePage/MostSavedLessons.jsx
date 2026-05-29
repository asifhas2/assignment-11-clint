import { motion } from "framer-motion";
import { Bookmark, Flame, Heart } from "lucide-react";

const savedLessons = [
  {
    id: 1,
    title: "Time Management Tips",
    saves: 340,
    color: "from-pink-500 to-red-500",
  },
  {
    id: 2,
    title: "How to Stay Motivated",
    saves: 290,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Handling Stress in Study",
    saves: 250,
    color: "from-green-500 to-emerald-500",
  },
];

export function MostSavedLessons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-2xl shadow-xl mt-6 border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bookmark className="text-blue-500" />
            Most Saved Lessons
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Students’ favorite learning content
          </p>
        </div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="bg-orange-100 p-3 rounded-full"
        >
          <Flame className="text-orange-500" />
        </motion.div>
      </div>

      {/* Lessons */}
      <div className="space-y-4">
        {savedLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.2,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{
              scale: 1.02,
              y: -3,
            }}
            className="relative overflow-hidden rounded-xl border p-4 bg-gray-50 hover:shadow-lg transition-all"
          >
            {/* Background Glow */}
            <div
              className={`absolute inset-0 opacity-10 bg-gradient-to-r ${lesson.color}`}
            ></div>

            <div className="relative flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${lesson.color} flex items-center justify-center text-white font-bold`}
                >
                  {index + 1}
                </motion.div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {lesson.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Popular among students
                  </p>
                </div>
              </div>

              {/* Right */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-pink-500 font-bold text-lg"
              >
                <Heart className="fill-pink-500" size={20} />
                {lesson.saves}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}