// Footer.jsx

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from "react-icons/hi";



const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo + Website Name */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              
              {/* Logo */}
              <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWEtVbiEIkmX1Py9MeNUnkzt0SDc3AzpyLsg&s"
                alt="SkillNest Logo"
                className="w-14 h-14 rounded-xl object-cover border border-slate-700"
              />

              {/* Website Name */}
              <div>
                <h2 className="text-2xl font-bold text-white">
                  LifeStoryHub
                </h2>

                <p className="text-sm text-gray-400">
                  Learn Smarter Everyday
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-gray-400">
              LifeStoryHub is a modern learning platform where
              students can explore lessons, improve skills,
              and grow their knowledge with interactive
              learning experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm">
              
              <div className="flex items-center gap-3">
                <HiOutlineLocationMarker className="text-blue-400 text-xl" />
                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlinePhone className="text-blue-400 text-xl" />
                <p>+880 1810401376</p>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineMail className="text-blue-400 text-xl" />
                <p>ak1247942@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-400 transition"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-400 transition"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/privacy"
                  className="hover:text-blue-400 transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/support"
                  className="hover:text-blue-400 transition"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">
              
              <a
                href="https://www.facebook.com/bfinit/"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-500 transition flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/technology/?hl=en"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-pink-500 transition flex items-center justify-center"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/in/asif-hasan-840738380/"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-sky-500 transition flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/enterprise"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gray-700 transition flex items-center justify-center"
              >
                <FaGithub />
              </a>
            </div>

            <p className="text-sm text-gray-500 mt-5">
              Stay connected with us on social media.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SkillNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;