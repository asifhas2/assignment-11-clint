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

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function MostSavedLessons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-card border border-border rounded-2xl shadow-sm mt-6 text-foreground"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bookmark className="text-indigo-500" />
            Most Saved Lessons
          </h2>

          <p className="text-muted-foreground text-sm mt-1">
            Students’ favorite learning content
          </p>
        </div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-indigo-500/10 p-3 rounded-full"
        >
          <Flame className="text-indigo-500" />
        </motion.div>
      </div>

      {/* Lessons */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {savedLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            variants={item}
            whileHover={{ scale: 1.02, y: -4 }}
            className="relative overflow-hidden rounded-xl border border-border p-4 bg-card transition-all"
          >
            {/* Glow Background */}
            <div
              className={`absolute inset-0 opacity-10 bg-gradient-to-r ${lesson.color}`}
            />

            <div className="relative flex items-center justify-between">

              {/* Left */}
              <div className="flex items-center gap-4">

                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${lesson.color} flex items-center justify-center text-white font-bold shadow-md`}
                >
                  {index + 1}
                </motion.div>

                <div>
                  <h3 className="font-semibold">
                    {lesson.title}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    Popular among students
                  </p>
                </div>
              </div>

              {/* Right */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-pink-500 font-semibold text-lg"
              >
                <Heart className="fill-pink-500" size={20} />
                {lesson.saves}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}