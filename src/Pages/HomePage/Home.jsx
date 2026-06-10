import React, { useEffect, useRef } from "react";
import Slider from "./Slider";
import WhyLearn from "./WhyLearn";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaHeart, FaBookOpen, FaLightbulb, FaQuoteLeft, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router"; // Keeps your specific router setup
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TopContributors } from "../../../TopContributors";
import { MostSavedLessons } from "./MostSavedLessons";
import FeaturedGrid from "./FeaturedGrid";

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsSection from "./StatsSection";
import HowItWorks from "./HowItWorks";

// Register ScrollTrigger plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  const axiosSecure = useAxiosSecure();
  
  // Refs for GSAP targeted animations
  const statsRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  // 1. Dynamic Statistics Fetching via React Query
  const { data: stats = { totalUsers: 1240, totalSaves: 4820, activeLessons: 156 }, isLoading: statsLoading } = useQuery({
    queryKey: ["homepage-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/site-statistics");
      return res.data;
    },
    placeholderData: { totalUsers: 1240, totalSaves: 4820, activeLessons: 156 } // fallback values
  });

  // 2. Featured Lessons (Uncommented and kept intact for your grid if needed)
  const { data: featured = [] } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
  });

  // 3. GSAP Animation Effects
  useEffect(() => {
    // Reveal Stats Section Elements on Scroll
    const statsCtx = gsap.context(() => {
      gsap.from(".stat-box", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }, statsRef);

    // Fade-in FAQ Accordions
    const faqCtx = gsap.context(() => {
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 85%",
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });
    }, faqRef);

    // Call To Action Scale-up
    const ctaCtx = gsap.context(() => {
      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }, ctaRef);

    // Clean up animations when component unmounts
    return () => {
      statsCtx.revert();
      faqCtx.revert();
      ctaCtx.revert();
    };
  }, []);

  return (
    <div className="bg-base-200 min-h-screen overflow-x-hidden text-base-content">
      {/* Hero / Slider Section */}
      <Slider />

      {/* Featured Grid Section */}
      <section className="p-6 md:p-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Curated Knowledge</span>
            <h2 className="text-3xl md:text-4xl font-black mt-1 flex items-center gap-2">
              ⭐ Featured Life Lessons
            </h2>
          </div>
          <Link to="/public-lessons" className="btn btn-outline btn-primary btn-sm md:btn-md">
            View All Lessons
          </Link>
        </div>
        
        {/* Render your custom FeaturedGrid */}
        <FeaturedGrid featuredData={featured} />
      </section>

      {/* Dynamic Statistics Section (Backend Integrated) */}
    <StatsSection></StatsSection>

      {/* Why Learn Component */}
      <WhyLearn />

      {/* Top Contributors & Most Saved Lessons */}
      <TopContributors />
      <MostSavedLessons />

      {/* Testimonials Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-secondary font-bold text-sm uppercase tracking-wide">Community Stories</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1">What Our Members Say</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { quote: "This space changed how I approach my career bottlenecks completely.", author: "Sarah J.", role: "Product Designer" },
            { quote: "Reading the insights shared by top contributors feels like having an elite mentor.", author: "Rahat H.", role: "Software Engineer" },
            { quote: "Simple layout, zero fluff, and raw actionable value. The absolute best tool.", author: "Elena R.", role: "Startup Founder" }
          ].map((item, index) => (
            <div key={index} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body relative">
                <FaQuoteLeft className="text-3xl text-primary/20 absolute top-4 left-4" />
                <p className="italic text-base-content/80 mt-4 z-10">"{item.quote}"</p>
                <div className="divider my-2"></div>
                <div>
                  <h4 className="font-bold text-sm text-primary">{item.author}</h4>
                  <span className="text-xs opacity-60">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    {/**how it work section  */}
    <HowItWorks></HowItWorks>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-8 flex items-center justify-center gap-2">
          <FaQuestionCircle className="text-primary" /> Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div className="collapse collapse-plus bg-base-100 border border-base-300 faq-item rounded-box">
            <input type="radio" name="my-accordion-3" defaultChecked /> 
            <div className="collapse-title text-lg font-medium text-primary">How do I contribute my own life lessons?</div>
            <div className="collapse-content"> 
              <p>You can apply to become a contributor via your dashboard. Once approved by our team, you can instantly start drafting and publishing your lessons.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300 faq-item rounded-box">
            <input type="radio" name="my-accordion-3" /> 
            <div className="collapse-title text-lg font-medium text-primary">Is there a limit to how many lessons I can save?</div>
            <div className="collapse-content"> 
              <p>Absolutely not! Registered users can bookmark and organize unlimited life lessons inside their personal collections safely.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300 faq-item rounded-box">
            <input type="radio" name="my-accordion-3" /> 
            <div className="collapse-title text-lg font-medium text-primary">Are backend metrics synchronized live?</div>
            <div className="collapse-content"> 
              <p>Yes. The platform updates dynamic platform stats immediately using optimistic client-side catching powered by React Query.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action (CTA) Section */}
     <section className="px-6 py-12 max-w-7xl mx-auto">
  <div
    ref={ctaRef}
    className="hero bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl p-8 md:p-16 relative overflow-hidden"
  >
    {/* Overlay for better text visibility */}
    <div className="absolute inset-0 bg-base"></div>

    <div className="hero-content text-center relative z-10">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-base-1000 drop-shadow-lg">
          Ready to Level Up Your Life Decisions?
        </h2>

        <p className="mb-8 text-sm md:text-lg text-base-1000 leading-relaxed">
          Join thousands of software engineers, designers, and creatives
          sharing real wisdom instead of hypothetical concepts. Fully free,
          completely collaborative.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="btn btn-neutral btn-wide shadow-lg border-none hover:bg-white hover:text-neutral scale-105 transition-all duration-300"
          >
            Get Started Instantly
          </Link>

          <Link
            to="/about"
            className="btn btn-neutral btn-wide text-white border-white hover:bg-white hover:text-neutral transition-all duration-300"
          >
            Learn How It Works
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;