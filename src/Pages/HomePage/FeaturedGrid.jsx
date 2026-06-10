import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Heart, Bookmark, Flame } from "lucide-react";

const FeaturedGrid = () => {
  const axiosSecure = useAxiosSecure();

  const [expandedId, setExpandedId] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [reactions, setReactions] = useState({}); // {id: "like" | "love" | "fire"}

  const { data: featuredData = [] } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
  });

  const toggleSave = (id) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const setReaction = (id, type) => {
    setReactions((prev) => ({
      ...prev,
      [id]: prev[id] === type ? null : type,
    }));
  };

  const getShortText = (text, limit = 90) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {featuredData.slice(0, 4).map((lesson) => {
        const isExpanded = expandedId === lesson._id;
        const isSaved = savedItems.includes(lesson._id);
        const reaction = reactions[lesson._id];

        return (
          <motion.div
            key={lesson._id}
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -6 }}
            className="bg-card  rounded-2xl overflow-hidden shadow-sm relative"
          >
            {/* IMAGE */}
            <motion.div className="overflow-hidden">
              <motion.img
                src={lesson.image}
                alt={lesson.title}
                className="h-44 w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* SAVE BUTTON */}
            <motion.button
              onClick={() => toggleSave(lesson._id)}
              whileTap={{ scale: 0.8 }}
              className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-2 rounded-full"
            >
              <Bookmark
                size={18}
                className={
                  isSaved ? "text-yellow-400 fill-yellow-400" : "text-white"
                }
              />
            </motion.button>

            <div className="p-4">
              {/* TITLE */}
              <h2 className="text-lg font-bold mb-1">{lesson.title}</h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground">
                {isExpanded
                  ? lesson.description
                  : getShortText(lesson.description)}
              </p>

              {/* READ MORE */}
              {lesson.description?.length > 90 && (
                <button
                  onClick={() => setExpandedId(isExpanded ? null : lesson._id)}
                  className="text-indigo-500 text-sm mt-1 hover:underline"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}

              {/* CATEGORY */}

              {/* REACTIONS */}
              <div className="flex items-center justify-between  gap-3 mt-4">
                {/* LIKE */}

                <p className="text-[16px] font-semibold  text-muted-foreground mt-2">
                  {lesson.category}
                </p>
                <p className="flex justify-center items-center gap-1 font-bold">
                  {lesson.reactions}
                  <Heart
                    size={18}
                    className={
                      reaction === "like"
                        ? "text-pink-500 fill-pink-500"
                        : "text-muted-foreground"
                    }
                  />
                </p>
              </div>

              {/* VIEW BUTTON */}
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  to={`/public-lessons/${lesson._id}`}
                  className="btn btn-sm mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FeaturedGrid;
