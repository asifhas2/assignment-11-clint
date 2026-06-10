import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";

const Slider = () => {
  return (
    <div className="w-full relative">

      {/* Glow background effect */}
      <div className="absolute w-72 h-72 bg-primary/20 blur-3xl rounded-full top-10 left-10 z-0"></div>

      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={4000}
        transitionTime={700}
        swipeable
        emulateTouch
      >

        {/* Slide 1 */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            className="w-full h-full object-cover"
            alt="inspiration"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-5">
            <h1 className="text-white text-3xl md:text-5xl font-bold animate-fade-in">
              Learn From Every Story
            </h1>
            <p className="text-white/80 mt-3 max-w-xl">
              Discover life lessons, share experiences and grow together.
            </p>

            <div className="mt-5 flex gap-3">
              <Link to="/public-lessons" className="btn btn-primary">
                Explore Stories
              </Link>
              <Link to="/dashboard/add-lesson" className="btn btn-outline text-white">
                Share Story
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1506784365847-bbad939e9335"
            className="w-full h-full object-cover"
            alt="growth"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-5">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              Your Experience Matters
            </h1>
            <p className="text-white/80 mt-3 max-w-xl">
              Turn your life journey into inspiration for others.
            </p>

            <div className="mt-5 flex gap-3">
              <Link to="/public-lessons" className="btn btn-primary">
                Read Stories
              </Link>
              <Link to="/dashboard" className="btn btn-outline text-white">
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[300px] md:h-[500px] lg:h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            className="w-full h-full object-cover"
            alt="community"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-5">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              Join a Growing Community
            </h1>
            <p className="text-white/80 mt-3 max-w-xl">
              Thousands of people sharing real-life experiences.
            </p>

            <div className="mt-5 flex gap-3">
              <Link to="/register" className="btn btn-primary">
                Join Now
              </Link>
              <Link to="/public-lessons" className="btn btn-outline text-white">
                Explore
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 4 */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            className="w-full h-full object-cover"
            alt="success"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-5">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              Inspire & Be Inspired
            </h1>
            <p className="text-white/80 mt-3 max-w-xl">
              Every lesson you share can change someone's life.
            </p>

            <div className="mt-5 flex gap-3">
              <Link to="/dashboard/add-lesson" className="btn btn-primary">
                Start Writing
              </Link>
              <Link to="/public-lessons" className="btn btn-outline text-white">
                Learn More
              </Link>
            </div>
          </div>
        </div>

      </Carousel>
    </div>
  );
};

export default Slider;