import React from "react";
import { Link, Navigate } from "react-router";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";



const ForbiddenPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 overflow-hidden">
     <div>
         <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center"
      >
        {/* Animated Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-red-300 rounded-3xl blur-3xl opacity-30"
        ></motion.div>

        {/* Lock Animation */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="relative flex justify-center mb-6"
        >
          <div className="bg-error text-white p-8 rounded-full shadow-lg">
            <FaLock size={70} />
          </div>
        </motion.div>

        {/* 403 Text */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-extrabold text-error mb-4"
        >
          403
        </motion.h1>

        {/* Message */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-3"
        >
          Access Forbidden
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-500 mb-8"
        >
          Sorry, you don't have permission to access this page.
        </motion.p>

        {/* Buttons */}
      </motion.div>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
  <button
    onClick={() => navigate("/")}
    className="btn btn-primary px-8"
  >
    Go Home
  </button>

  <button
    onClick={() => navigate(-1)}
    className="btn btn-outline btn-error px-8"
  >
    Go Back
  </button>
</div>
     </div>
    </div>
  );
};

export default ForbiddenPage;