import React from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { p } from "framer-motion/client";
import { useQuery } from "@tanstack/react-query";

const Pricing = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

     const handelPayButton =async()=>{
        const cost =1500;
        const paymentInfo ={
            cost : cost,
            senderEmail:user.email
        }

        const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
        window.location.href=res.data.url;
        console.log(res.data);
    }

    const {data}=useQuery({
        queryKey:['user',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })

    console.log(data);

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full">

        {/* Free Card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          className="w-full bg-[#171717] border border-gray-800 rounded-3xl p-8 shadow-2xl"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Free Plan</h1>

          <div className="flex items-end gap-2 mb-5">
            <h2 className="text-6xl font-bold text-white">$00</h2>
            <p className="text-gray-400 mb-2">USD/month</p>
          </div>

          <p className="text-gray-300 text-lg mb-8">
            Level up productivity and creativity with expanded access
          </p>

          <button className="btn w-full rounded-full bg-gray-700 hover:bg-gray-600 border-none text-gray-300 h-14 text-lg">
         Free plan
          </button>

          <div className="mt-8 space-y-5">

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">Read limited lessons</p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
                Create basic lessons
              </p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
               Ads included
              </p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
               Limited bookmarks
              </p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
               Public lessons only
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
             Basic profile
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
              Community access
              </p>
            </div>

          </div>
        </motion.div>

        {/* Pro Card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.03 }}
          className="w-full bg-[#171717] border border-gray-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >

          {/* Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>

          <h1 className="text-4xl font-bold text-white mb-4">💎 Premium Plan</h1>

          <div className="flex items-end gap-2 mb-5">
            <h2 className="text-6xl font-bold text-white">$1500</h2>
            <p className="text-gray-400 mb-2">USD/one-time</p>
          </div>

          <p className="text-gray-300 text-lg mb-8">
            Get the best of life lesson with the highest level of access
          </p>

          <button onClick={handelPayButton} className="btn w-full rounded-full bg-gray-700 hover:bg-gray-600 border-none text-gray-300 h-14 text-lg">
          {
            data?.plan ==="free" ? "  Get Premium":"All ready used premium"
          }
          </button>

          <div className="mt-8 space-y-5">

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">Unlimited lesson access</p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
               Create featured lessons
              </p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
               Ad-free experience
              </p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
              Unlimited bookmarks
              </p>
            </div>

            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
               Private + public lessons
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
             Premium badge
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
               Private + public lessons
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
             Priority support
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
              Analytics dashboard
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
             Early access features
              </p>
            </div>
            <div className="flex gap-3">
              <FaCheck className="text-green-400 mt-1" />
              <p className="text-gray-200">
            AI writing assistance
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Pricing;