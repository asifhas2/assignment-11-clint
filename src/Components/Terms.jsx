import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-base-100 to-base-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 px-5 py-2 bg-base-200 hover:bg-slate-300 rounded-lg transition"
        >
          ← Back
        </button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-bold text-base-800">
            Terms & Conditions
          </h1>
          <p className="text-base-500 mt-4">
            Please read these terms carefully before using LifeStoryHub.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8 text-base-600 leading-relaxed">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-base-800 mb-2">
              1. Our Purpose
            </h2>
            <p>
              LifeStoryHub is a storytelling platform where users can share personal life stories,
              experiences, and connect with others through meaningful content.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-base-800 mb-2">
              2. User Content
            </h2>
            <p>
              Users are responsible for the stories and content they publish. Content must not include
              harmful, illegal, or abusive material. Respect others’ experiences and privacy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-base-800 mb-2">
              3. Community Behavior
            </h2>
            <p>
              LifeStoryHub promotes kindness and empathy. Any form of harassment, hate speech,
              or toxic behavior will result in account restriction or removal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-base-800 mb-2">
              4. Content Ownership
            </h2>
            <p>
              You retain ownership of your stories. However, by posting on LifeStoryHub,
              you allow us to display and share your content within the platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-base-800 mb-2">
              5. Account Safety
            </h2>
            <p>
              Users are responsible for keeping their account secure. Do not share your login
              information with others.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold text-base-800 mb-2">
              6. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions at any time. Users will be notified about
              major changes on the platform.
            </p>
          </motion.div>

        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-base-400 text-sm">
          © {new Date().getFullYear()} LifeStoryHub. All rights reserved.
        </div>

      </div>
    </section>
  );
};

export default Terms;