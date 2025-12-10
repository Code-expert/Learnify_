import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center animate-fadeIn">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold gradient-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <FiHome />
            <span>Go Home</span>
          </Link>
          
          <Link
            to="/topics"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-700 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-gray-200"
          >
            <FiSearch />
            <span>Browse Topics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
