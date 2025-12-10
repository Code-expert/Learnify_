import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <span className="text-3xl font-bold text-white">Learnify</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Your ultimate platform for mastering web development. Learn HTML, CSS, JavaScript, React, and more with comprehensive, easy-to-follow tutorials designed for developers of all levels.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 hover:scale-110 transition-all"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:scale-110 transition-all"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-700 hover:scale-110 transition-all"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:scale-110 transition-all"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/topics"
                  className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                  All Topics
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Topics */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-secondary-500 to-accent-500 rounded mr-2"></span>
              Popular Topics
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/topics/html-tutorial"
                  className="text-gray-400 hover:text-secondary-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 mr-0 group-hover:mr-2 transition-all"></span>
                  HTML Tutorial
                </Link>
              </li>
              <li>
                <Link
                  to="/topics/css-tutorial"
                  className="text-gray-400 hover:text-secondary-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 mr-0 group-hover:mr-2 transition-all"></span>
                  CSS Tutorial
                </Link>
              </li>
              <li>
                <Link
                  to="/topics/javascript-tutorial"
                  className="text-gray-400 hover:text-secondary-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 mr-0 group-hover:mr-2 transition-all"></span>
                  JavaScript Tutorial
                </Link>
              </li>
              <li>
                <Link
                  to="/topics/react-tutorial"
                  className="text-gray-400 hover:text-secondary-400 transition-colors inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 mr-0 group-hover:mr-2 transition-all"></span>
                  React Tutorial
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left flex items-center space-x-1">
              <span>&copy; {currentYear} Learnify. Built with</span>
              <FiHeart className="text-red-500 animate-pulse" size={16} />
              <span>for developers</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
