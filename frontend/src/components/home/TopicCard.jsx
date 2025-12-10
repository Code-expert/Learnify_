import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const TopicCard = ({ topic, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const gradients = [
    'from-orange-400 to-red-500',
    'from-blue-400 to-indigo-500',
    'from-yellow-400 to-orange-500',
    'from-purple-400 to-pink-500',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <Link
      to={`/topics/${topic.slug}`}
      className="group relative block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePosition.y - 50) / 10}deg) rotateY(${
              (50 - mousePosition.x) / 10
            }deg) scale(1.05)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500`}
      />

      {/* Card */}
      <div className="relative h-full bg-white rounded-3xl p-6 shadow-xl border border-gray-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full blur-2xl`} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl sm:text-4xl mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
          >
            {topic.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {topic.title.replace(' Tutorial', '')}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
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

          {/* Progress Bar (decorative) */}
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 group-hover:w-full`}
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
