import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopics } from '../../redux/slices/topicsSlice';
import { FiArrowRight, FiBook } from 'react-icons/fi';
import Loader from '../common/Loader';
import TopicCard from './TopicCard';

const FeaturedTopics = () => {
  const dispatch = useDispatch();
  const { topics, isLoading } = useSelector((state) => state.topics);

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <FiBook className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Popular Topics</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Start Your{' '}
            <span className="gradient-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive tutorials and master web development skills
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {topics.slice(0, 4).map((topic, index) => (
            <TopicCard key={topic._id} topic={topic} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fadeIn">
          <Link
            to="/topics"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100 group"
          >
            <span>Explore All Topics</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTopics;
