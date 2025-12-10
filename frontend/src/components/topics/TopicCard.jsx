import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen, FiClock } from 'react-icons/fi';

const TopicCard = ({ topic, viewMode = 'grid', index }) => {
  const gradients = [
    'from-orange-400 to-red-500',
    'from-blue-400 to-indigo-500',
    'from-yellow-400 to-orange-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-emerald-500',
    'from-pink-400 to-rose-500',
  ];

  const gradient = gradients[index % gradients.length];

  if (viewMode === 'list') {
    return (
      <Link
        to={`/topics/${topic.slug}`}
        className="group block animate-fadeIn"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
          {/* Glow Effect */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />

          <div className="relative flex items-center space-x-6">
            {/* Icon */}
            <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              {topic.icon}
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {topic.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <FiBookOpen />
                  <span>{topic.lessonsCount || 0} Lessons</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FiClock />
                  <span>{topic.difficulty || 'Beginner'}</span>
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
                <FiArrowRight className="text-xl text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View (same as before)
  return (
    <Link
      to={`/topics/${topic.slug}`}
      className="group block animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-full">
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />

        {/* Card */}
        <div className="relative h-full bg-white rounded-3xl p-6 shadow-xl border border-gray-100 overflow-hidden card-hover">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full blur-2xl`} />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Icon */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              {topic.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {topic.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
              {topic.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-gray-500">
                <FiBookOpen className="text-sm" />
                <span className="text-sm font-medium">
                  {topic.lessonsCount || 0} Lessons
                </span>
              </div>

              <div className="flex items-center space-x-1 text-blue-600 font-medium text-sm group-hover:space-x-2 transition-all">
                <span>Start</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 group-hover:w-full`}
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
