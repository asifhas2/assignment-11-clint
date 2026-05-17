import React from 'react';
import Slider from './Slider';
import WhyLearn from './WhyLearn';
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaHeart, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TopContributors } from '../../../TopContributors';
import { MostSavedLessons } from './MostSavedLessons';

const Home = () => {
      const axiosSecure = useAxiosSecure();

  // featured lessons (admin controlled)
  const { data: featured = [] } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
  });



 
    return (
        <div className='bg-base-200 min-h-screen'>
           <Slider></Slider>
            <section className="p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-6">
          ⭐ Featured Life Lessons
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((lesson) => (
            <div
              key={lesson._id}
              className="card bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={lesson.image}
                  alt=""
                  className="h-40 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {lesson.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {lesson.category}
                </p>

                <Link
                  to={`/public-lessons/${lesson._id}`}
                  className="btn btn-primary btn-sm mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

  
           <WhyLearn></WhyLearn>
<TopContributors></TopContributors>

      <MostSavedLessons></MostSavedLessons>
        </div>
    );
};

export default Home;