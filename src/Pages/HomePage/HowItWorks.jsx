import { motion } from "framer-motion";
import {
  FaPenNib,
  FaUpload,
  FaUsers,
  FaHeart,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Write Your Story",
    description: "Share your personal life experience, memories, or journey.",
    icon: <FaPenNib />,
  },
  {
    id: 2,
    title: "Publish & Share",
    description: "Post your story and make it visible to the community.",
    icon: <FaUpload />,
  },
  {
    id: 3,
    title: "Connect With Others",
    description: "People read, relate, and engage with your story.",
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: "Get Support & Love",
    description: "Receive likes, comments, and emotional support.",
    icon: <FaHeart />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold">
            How It Works
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Share your life journey, connect with people, and be part of a supportive storytelling community.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative bg-card border border-border rounded-3xl p-8 overflow-hidden"
            >
              {/* icon */}
              <div className="text-indigo-500 text-3xl mb-5">
                {step.icon}
              </div>

              {/* step number */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {step.id}
              </div>

              {/* content */}
              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>

              {/* soft glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;