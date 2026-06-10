import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 px-5 py-2 bg-card border border-border rounded-lg hover:opacity-80 transition"
        >
          ← Back
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-bold">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground mt-4">
            Your privacy matters. This page explains how LifeStoryHub handles your data.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">

          {[
            {
              title: "1. Information We Collect",
              text:
                "We collect basic information such as your name, email address, and profile details when you create an account. We also store the stories you publish.",
            },
            {
              title: "2. How We Use Your Data",
              text:
                "Your data is used to provide platform features like story sharing, personalization, and improving user experience.",
            },
            {
              title: "3. Story Content Privacy",
              text:
                "Stories you publish are visible based on your settings. You control what you share publicly.",
            },
            {
              title: "4. Data Protection",
              text:
                "We use security measures to protect your data, but no system is 100% secure.",
            },
            {
              title: "5. Cookies & Tracking",
              text:
                "We use cookies to improve user experience, remember preferences, and analyze usage.",
            },
            {
              title: "6. Third-Party Services",
              text:
                "We may use third-party tools for authentication and analytics, each with their own policies.",
            },
            {
              title: "7. Your Rights",
              text:
                "You can update or delete your account anytime and control your data and story visibility.",
            },
            {
              title: "8. Updates to Policy",
              text:
                "We may update this policy. Changes will be reflected on this page.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-6 rounded-2xl"
            >
              <h2 className="text-xl font-semibold mb-2">
                {item.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground text-sm">
          © {new Date().getFullYear()} LifeStoryHub. All rights reserved 💙
        </div>

      </div>
    </section>
  );
};

export default PrivacyPolicy;