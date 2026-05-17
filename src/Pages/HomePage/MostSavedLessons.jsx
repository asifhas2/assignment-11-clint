import { motion } from "framer-motion";

const savedLessons = [
  { id: 1, title: "Time Management Tips", saves: 340 },
  { id: 2, title: "How to Stay Motivated", saves: 290 },
  { id: 3, title: "Handling Stress in Study", saves: 250 },
];

export function MostSavedLessons() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">📌 Most Saved Lessons</h2>

      <div className="space-y-3">
        {savedLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="flex justify-between items-center p-3 border rounded-lg"
          >
            <p className="font-medium">{lesson.title}</p>

            <span className="text-green-600 font-bold">
              ❤️ {lesson.saves}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}