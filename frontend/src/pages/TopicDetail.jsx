import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTopicBySlug } from '../redux/slices/topicsSlice';
import { FiHome, FiChevronRight, FiBookOpen, FiClock, FiBarChart2 } from 'react-icons/fi';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const TopicDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentTopic, isLoading, isError, message } = useSelector((state) => state.topics);

  useEffect(() => {
    console.log('📍 Loading topic:', slug);
    dispatch(getTopicBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    console.log('📦 Current Topic Data:', currentTopic);
  }, [currentTopic]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={message || 'Failed to load topic'} />
      </div>
    );
  }

  if (!currentTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message="Topic not found" />
      </div>
    );
  }

  // Handle different response structures
  let topic, lessons;

  if (currentTopic.data) {
    // Response format: { success: true, data: { ...topic, lessons: [...] } }
    topic = currentTopic.data;
    lessons = currentTopic.data.lessons || [];
  } else if (currentTopic.topic) {
    // Response format: { topic: {...}, lessons: [...] }
    topic = currentTopic.topic;
    lessons = currentTopic.lessons || [];
  } else {
    // Direct format: { ...topic, lessons: [...] }
    topic = currentTopic;
    lessons = currentTopic.lessons || [];
  }

  console.log('✅ Parsed Topic:', topic);
  console.log('✅ Parsed Lessons:', lessons);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8 animate-fadeIn">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            <FiHome />
          </Link>
          <FiChevronRight className="text-gray-400" />
          <Link to="/topics" className="hover:text-blue-600 transition-colors">
            Topics
          </Link>
          <FiChevronRight className="text-gray-400" />
          <span className="text-gray-900 font-medium">{topic?.title || 'Loading...'}</span>
        </nav>

        {/* Topic Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6 shadow-2xl text-5xl">
            {topic?.icon || '📚'}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            {topic?.title || 'Topic'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {topic?.description || 'No description available'}
          </p>

          {/* Topic Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md border border-gray-100">
              <FiBookOpen className="text-blue-600 text-xl" />
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
                <p className="text-sm text-gray-600">Lessons</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md border border-gray-100">
              <FiBarChart2 className="text-green-600 text-xl" />
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900 capitalize">
                  {topic?.difficulty || topic?.level || 'Beginner'}
                </p>
                <p className="text-sm text-gray-600">Level</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md border border-gray-100">
              <FiClock className="text-purple-600 text-xl" />
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">
                  {lessons.length * 15}m
                </p>
                <p className="text-sm text-gray-600">Duration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Course Content ({lessons.length} Lessons)
          </h2>

          {lessons.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
              <FiBookOpen className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No lessons available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson._id || index}
                  to={`/lessons/${lesson.slug}`}
                  className="group block animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />

                    <div className="relative flex items-center space-x-6">
                      {/* Lesson Number */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                        {lesson.order || index + 1}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-grow min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {lesson.title}
                        </h3>
                        {lesson.description && (
                          <p className="text-gray-600 line-clamp-2 mb-2">
                            {lesson.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4">
                          {(lesson.level || lesson.difficulty) && (
                            <span className="text-sm text-gray-500 capitalize">
                              📊 {lesson.level || lesson.difficulty}
                            </span>
                          )}
                          {lesson.duration && (
                            <span className="text-sm text-gray-500">
                              ⏱️ {lesson.duration} min
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0">
                        <FiChevronRight className="text-2xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        {lessons.length > 0 && (
          <div className="text-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <Link
              to={`/lessons/${lessons[0].slug}`}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <span>Start Learning</span>
              <FiChevronRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
