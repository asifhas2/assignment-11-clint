import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const FeaturedGrid = ({ featured = [] }) => {

    const axiosSecure = useAxiosSecure();

  // featured lessons (admin controlled)
  const { data: featuredData = [] } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
  });
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {featuredData.slice(0,4).map((lesson) => (
        <motion.div
          key={lesson._id}
          variants={cardVariants}
          whileHover={{ scale: 1.05 }}
          className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden"
        >
    
          <motion.figure className="overflow-hidden">
            <motion.img
              src={lesson.image}
              alt={lesson.title}
              className="h-40 w-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.figure>

          <div className="card-body">
            <h2 className="card-title text-[24px] font-bold">{lesson.title}</h2>

            <p className="text-sm text-gray-500">
              {lesson.category}
            </p>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to={`/public-lessons/${lesson._id}`}
                className="btn btn-primary btn-sm mt-2"
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedGrid;