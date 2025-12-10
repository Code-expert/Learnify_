import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const LessonNavigation = ({ prevLesson, nextLesson }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
      {/* Previous Lesson */}
      {prevLesson ? (
        <Link
          to={`/lessons/${prevLesson.slug}`}
          className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity" />
          <div className="relative flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
              <FiChevronLeft className="text-2xl" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs text-gray-500 mb-1">Previous</p>
              <p className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {prevLesson.title}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div /> // Empty space if no previous lesson
      )}

      {/* Next Lesson */}
      {nextLesson ? (
        <Link
          to={`/lessons/${nextLesson.slug}`}
          className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity" />
          <div className="relative flex items-center space-x-4">
            <div className="flex-grow min-w-0 text-right">
              <p className="text-xs text-gray-500 mb-1">Next</p>
              <p className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {nextLesson.title}
              </p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
              <FiChevronRight className="text-2xl" />
            </div>
          </div>
        </Link>
      ) : (
        <div /> // Empty space if no next lesson
      )}
    </div>
  );
};

export default LessonNavigation;
