// NotFound.jsx

import { motion } from "framer-motion";
import { Link } from "react-router";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center bg-base-100/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-2xl"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="flex justify-center mb-6"
        >
          <AlertTriangle size={90} className="text-yellow-400" />
        </motion.div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-white mb-4">404</h1>

        <h2 className="text-2xl font-bold text-gray-200 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <Home size={20} />
              Go Home
            </motion.button>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border border-gray-500 text-gray-200 hover:bg-base-100/10 px-6 py-3 rounded-xl font-semibold transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
