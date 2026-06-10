import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    q: "How do I post a story?",
    a: "Go to 'Create Story', write your experience, and click publish. Your story will be visible to the community.",
  },
  {
    q: "Can I edit my story later?",
    a: "Yes, you can edit or delete your story from your profile dashboard anytime.",
  },
  {
    q: "Is LifeStoryHub free to use?",
    a: "Yes, it is completely free for all users to share and read stories.",
  },
  {
    q: "How do I report harmful content?",
    a: "Click the 'Report' button on any story or contact our support team directly.",
  },
];

const SupportCenter = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill all fields before submitting.");
      return;
    }

    console.log("Support Request:", formData);

    setSuccess(true);
    setError("");
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 px-5 py-2 bg-card border border-border rounded-lg hover:opacity-80 transition"
        >
          ← Back
        </button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold">
            Support Center
          </h1>
          <p className="text-muted-foreground mt-4">
            We are here to help you with your stories, account, and experience.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-2">
                {item.q}
              </h3>
              <p className="text-muted-foreground">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-3xl p-10 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Contact Support
          </h2>

          {success && (
            <p className="text-green-500 text-center mb-4 font-medium">
              ✅ Your message has been sent successfully!
            </p>
          )}

          {error && (
            <p className="text-red-500 text-center mb-4 font-medium">
              ⚠️ {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              name="message"
              placeholder="Describe your issue..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default SupportCenter;