import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaTimesCircle, FaHome, FaRedo } from "react-icons/fa";

const PaymentCenceld = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
        }}
        className="max-w-lg w-full bg-base-100 rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden"
      >
        {/* Animated Background Circle */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute -top-20 -right-20 w-52 h-52 bg-red-200 rounded-full opacity-30"
        />

        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          }}
          className="flex justify-center mb-6 relative z-10"
        >
          <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center">
            <FaTimesCircle className="text-red-500 text-7xl" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-extrabold text-gray-800 mb-4"
        >
          Payment Canceled
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-500 leading-7 mb-8"
        >
          Your payment process was canceled or failed. Don’t worry — no money
          has been charged. You can try again anytime.
        </motion.p>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gray-50 border rounded-2xl p-5 mb-8 text-left space-y-3"
        >
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>

            <span className="font-semibold text-red-500">Canceled</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Reason</span>

            <span className="font-semibold text-gray-800">
              User Closed Payment
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>

            <span className="font-bold text-gray-700">$120.00</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Home Button */}
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              <FaHome />
              Back Home
            </motion.button>
          </Link>

          {/* Retry Button */}
          <Link to="/checkout">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              <FaRedo />
              Try Again
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentCenceld;
