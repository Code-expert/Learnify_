import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLessonBySlug } from '../redux/slices/lessonsSlice';
import { FiHome, FiChevronRight, FiClock, FiBookOpen } from 'react-icons/fi';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import CodeBlock from '../components/lessons/CodeBlock';

const LessonDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentLesson, isLoading, isError, message } = useSelector((state) => state.lessons);

  useEffect(() => {
    console.log('📍 Loading lesson:', slug);
    dispatch(getLessonBySlug(slug));
    window.scrollTo(0, 0);
  }, [dispatch, slug]);

  useEffect(() => {
    console.log('📦 Current Lesson Data:', currentLesson);
  }, [currentLesson]);

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
        <ErrorMessage message={message || 'Lesson not found'} />
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message="Lesson not found" />
      </div>
    );
  }

  // Handle different response structures
  let lesson, topic, prevLesson, nextLesson;

  if (currentLesson.data) {
    // Response format: { success: true, data: { lesson, topic, prevLesson, nextLesson } }
    const data = currentLesson.data;
    lesson = data.lesson || data;
    topic = data.topic || lesson.topic;
    prevLesson = data.prevLesson;
    nextLesson = data.nextLesson;
  } else if (currentLesson.lesson) {
    // Response format: { lesson: {...}, topic: {...} }
    lesson = currentLesson.lesson;
    topic = currentLesson.topic;
    prevLesson = currentLesson.prevLesson;
    nextLesson = currentLesson.nextLesson;
  } else {
    // Direct format
    lesson = currentLesson;
    topic = currentLesson.topic;
  }

  console.log('✅ Parsed Lesson:', lesson);
  console.log('✅ Parsed Topic:', topic);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message="Lesson not found" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        {topic && (
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8 animate-fadeIn">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              <FiHome />
            </Link>
            <FiChevronRight className="text-gray-400" />
            <Link to="/topics" className="hover:text-blue-600 transition-colors">
              Topics
            </Link>
            <FiChevronRight className="text-gray-400" />
            <Link to={`/topics/${topic.slug}`} className="hover:text-blue-600 transition-colors">
              {topic.title}
            </Link>
            <FiChevronRight className="text-gray-400" />
            <span className="text-gray-900 font-medium">{lesson.title}</span>
          </nav>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-12">
            {/* Lesson Header */}
            <div className="mb-8 animate-fadeIn">
              {topic && (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg text-2xl">
                    {topic.icon}
                  </div>
                  <Link
                    to={`/topics/${topic.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    {topic.title}
                  </Link>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                {lesson.title}
              </h1>

              {lesson.description && (
                <p className="text-xl text-gray-600 mb-6">
                  {lesson.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                {(lesson.duration || lesson.estimatedTime) && (
                  <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                    <FiClock className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {lesson.duration || lesson.estimatedTime} min read
                    </span>
                  </div>
                )}
                {(lesson.difficulty || lesson.level) && (
                  <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                    <FiBookOpen className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {lesson.difficulty || lesson.level}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 mb-8 animate-fadeIn" style={{ animationDelay: '100ms' }}>
              {/* Render HTML content */}
              {lesson.content && (
                <div 
                  className="prose prose-lg max-w-none lesson-content"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              )}

              {/* Sample Code Section */}
              {lesson.sampleCode && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Try It Yourself
                  </h2>
                  <CodeBlock code={lesson.sampleCode} language="html" />
                </div>
              )}
            </div>

            {/* Navigation */}
            {(prevLesson || nextLesson) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                {/* Previous Lesson */}
                {prevLesson ? (
                  <Link
                    to={`/lessons/${prevLesson.slug}`}
                    className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                    <div className="relative">
                      <p className="text-xs text-gray-500 mb-1">Previous</p>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {prevLesson.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {/* Next Lesson */}
                {nextLesson ? (
                  <Link
                    to={`/lessons/${nextLesson.slug}`}
                    className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-right"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                    <div className="relative">
                      <p className="text-xs text-gray-500 mb-1">Next</p>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {nextLesson.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
