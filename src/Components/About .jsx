import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaUsers,
  FaHeart,
  FaGlobe,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Share Life Stories",
    description:
      "Express your real-life experiences, memories, struggles, and achievements in your own words.",
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    title: "Connect With People",
    description:
      "Meet people who relate to your journey and build meaningful emotional connections.",
    icon: <FaUsers />,
  },
  {
    id: 3,
    title: "Support & Empathy",
    description:
      "Receive love, support, and encouragement from a caring community.",
    icon: <FaHeart />,
  },
  {
    id: 4,
    title: "Global Story Community",
    description:
      "Be part of a worldwide platform where every story matters.",
    icon: <FaGlobe />,
  },
];

const About = () => {
  return (
    <section className="bg-gradient-to-b from-base-100 to-base-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold text-base-800">
            About LifeStoryHub
          </h1>

          <p className="text-base-500 mt-5 max-w-3xl mx-auto text-lg">
            LifeStoryHub is a storytelling platform where people share real-life experiences,
            connect emotionally, and inspire others through their journeys.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-indigo-600 text-white rounded-3xl p-10 mb-20 text-center shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-indigo-100">
            To create a safe and supportive digital space where everyone can express their
            life journey, find people who understand them, and feel less alone in their story.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl p-8 shadow-lg relative
              bg-base-100 
              overflow-hidden"
            >
              <div className="text-indigo-600 text-3xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-base-800">
                {item.title}
              </h3>

              <p className="text-base-500 leading-relaxed">
                {item.description}
              </p>

              {/* soft glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 blur-3xl opacity-40 rounded-full"></div>
            </motion.div>
          ))}
        </div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <h2 className="text-3xl font-bold text-base-800">
            Every Story Matters 💙
          </h2>

          <p className="text-base-500 mt-4 max-w-2xl mx-auto">
            No matter who you are or where you come from, your story has the power to inspire someone else.
            Share it with LifeStoryHub.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;