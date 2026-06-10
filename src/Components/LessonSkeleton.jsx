import { motion } from "framer-motion";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[rgba(0,0,0,0.06)] dark:before:via-white/10 before:to-transparent";

const LessonSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
    >
      {/* IMAGE */}
      <div className={`h-44 w-full bg-muted ${shimmer}`} />

      <div className="p-4 space-y-4">

        {/* HEADER */}
        <div className="flex items-center gap-3">

          <div className={`w-10 h-10 rounded-full bg-muted ${shimmer}`} />

          <div className="flex-1 space-y-2">
            <div className={`h-3 w-32 bg-muted rounded ${shimmer}`} />
            <div className={`h-2 w-20 bg-muted rounded ${shimmer}`} />
          </div>

          <div className={`w-6 h-6 rounded-full bg-muted ${shimmer}`} />
        </div>

        {/* TITLE */}
        <div className={`h-5 w-3/4 bg-muted rounded ${shimmer}`} />

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <div className={`h-3 w-full bg-muted rounded ${shimmer}`} />
          <div className={`h-3 w-11/12 bg-muted rounded ${shimmer}`} />
          <div className={`h-3 w-4/5 bg-muted rounded ${shimmer}`} />
        </div>

        {/* TAGS */}
        <div className="flex gap-2 mt-2">
          <div className={`h-5 w-16 rounded-full bg-muted ${shimmer}`} />
          <div className={`h-5 w-20 rounded-full bg-muted ${shimmer}`} />
          <div className={`h-5 w-14 rounded-full bg-muted ${shimmer}`} />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-border">

          <div className="flex gap-4">
            <div className={`h-4 w-12 bg-muted rounded ${shimmer}`} />
            <div className={`h-4 w-12 bg-muted rounded ${shimmer}`} />
            <div className={`h-4 w-12 bg-muted rounded ${shimmer}`} />
          </div>

          <div className={`h-8 w-24 rounded-lg bg-muted ${shimmer}`} />
        </div>

      </div>
    </motion.div>
  );
};

export default LessonSkeleton;