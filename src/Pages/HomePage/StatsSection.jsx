import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaUsers, FaHeart, FaBookOpen } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const axiosSecure = useAxiosSecure();
  const sectionRef = useRef(null);

  // 📡 Fetch backend data
  const { data:users=[] } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users"); 
      return res.data;
    },
  });
 const { data: stats = [] } = useQuery({
  queryKey: ["stats"],
  queryFn: async () => {
    const res = await axiosSecure.get("/stats");
    return res.data;
  },
});

  console.log(stats);

  // 🎬 GSAP animation


  return (
    <section
      ref={sectionRef}
      className="
        py-14 px-6 my-10
        bg-base-200
        text-base-content
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          📊 Platform Statistics
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* USERS */}
          <div className="stat-card card bg-base-100 shadow-xl border border-base-300 hover:scale-105 transition-all">
            <div className="card-body items-center text-center">
              <FaUsers className="text-4xl text-primary" />

              <h3 className="opacity-70 text-2xl font-semibold">Total Users : {users.length}</h3>

            

              <p className="text-success text-sm">
                ↗ Active community growing
              </p>
            </div>
          </div>

          {/* SAVES */}
          <div className="stat-card card bg-base-100 shadow-xl border border-base-300 hover:scale-105 transition-all">
            <div className="card-body items-center text-center">
              <FaHeart className="text-4xl text-secondary" />

              <h3 className="opacity-70 text-2xl font-semibold">Total Saves:45</h3>

             

              <p className="text-secondary text-sm">
                ❤️ Loved by learners
              </p>
            </div>
          </div>

          {/* LESSONS */}
          <div className="stat-card card bg-base-100 shadow-xl border border-base-300 hover:scale-105 transition-all">
            <div className="card-body items-center text-center">
              <FaBookOpen className="text-4xl text-accent" />

              <h3 className="opacity-70 text-2xl font-semibold">Active Lessons : 21</h3>

             

              <p className="text-accent text-sm">
                📚 Quality content published
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;