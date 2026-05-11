import React from 'react';
import { FaBookOpen } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
const WhyLearn = () => {
    
    const benefits = [
  {
    icon: <FaBookOpen />,
    title: "Real Experience",
    description: "Real life teaches practical knowledge.",
  },
  {
    icon: <FaBrain />,
    title: "Better Decision Making",
    description: "Life lessons help make smarter decisions.",
  },
  {
    icon: <FaHeart />,
    title: "Emotional Growth",
    description: "You become emotionally stronger.",
  },
  {
    icon: <FaGlobe />,
    title: "Community Wisdom",
    description: "Learn from others’ mistakes and success.",
  },
];
    return (
        <section className="py-12 px-4 md:px-16 bg-base-200">
      
   
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Learning From Life Matters
        </h2>
        <p className="text-gray-500 mt-2">
          Real lessons that shape your life journey
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
          >
            <div className="card-body items-center text-center">

         
              <div className="text-4xl text-primary">
                {item.icon}
              </div>

         
              <h3 className="card-title mt-2">{item.title}</h3>

       
              <p className="text-sm text-gray-500">
                {item.description}
              </p>

            </div>
          </div>
        ))}
      </div>
    </section>
    );
};

export default WhyLearn;