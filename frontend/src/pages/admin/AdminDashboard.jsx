import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { FiBook, FiFileText, FiCheckCircle, FiTrendingUp, FiPlus, FiRefreshCw } from 'react-icons/fi';
import apiClient from '../../utils/apiClient';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTopics: 0,
    totalLessons: 0,
    publishedTopics: 0,
    publishedLessons: 0,
    lessonsByLevel: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📊 Fetching topics and lessons...');

      // Fetch topics and lessons in parallel
      const [topicsResponse, lessonsResponse] = await Promise.all([
        apiClient.get('/admin/topics'),
        apiClient.get('/admin/lessons'),
      ]);

      const topics = topicsResponse.data.data || [];
      const lessons = lessonsResponse.data.data || [];

      console.log('✅ Topics:', topics);
      console.log('✅ Lessons:', lessons);

      // Calculate stats from the data
      const totalTopics = topics.length;
      const publishedTopics = topics.filter(topic => topic.isPublished).length;
      
      const totalLessons = lessons.length;
      const publishedLessons = lessons.filter(lesson => lesson.isPublished).length;

      // Group lessons by level
      const lessonsByLevel = {};
      lessons.forEach(lesson => {
        const level = (lesson.level || lesson.difficulty || 'unknown').toLowerCase();
        lessonsByLevel[level] = (lessonsByLevel[level] || 0) + 1;
      });

      const calculatedStats = {
        totalTopics,
        publishedTopics,
        totalLessons,
        publishedLessons,
        lessonsByLevel,
      };

      console.log('✅ Calculated stats:', calculatedStats);
      setStats(calculatedStats);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: FiBook,
      label: 'Total Topics',
      value: stats.totalTopics,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: FiFileText,
      label: 'Total Lessons',
      value: stats.totalLessons,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: FiCheckCircle,
      label: 'Published Topics',
      value: stats.publishedTopics,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: FiTrendingUp,
      label: 'Published Lessons',
      value: stats.publishedLessons,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">Welcome back! Here's your overview.</p>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300 disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            <FiRefreshCw className={`text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-medium text-gray-700">Refresh</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-shake">
            <p className="text-red-800 font-semibold">⚠️ {error}</p>
            <button
              onClick={fetchStats}
              className="mt-2 text-sm text-red-600 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <div
                  key={index}
                  className="relative group animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />

                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center shadow-md`}>
                        <stat.icon className={`text-2xl ${stat.textColor}`} />
                      </div>
                      <div className={`text-3xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                    
                    {/* Progress indicator */}
                    <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                        style={{ width: stat.value > 0 ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>⚡</span> Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/admin/topics"
                  className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                  <div className="relative flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <FiPlus className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Manage Topics
                      </h3>
                      <p className="text-sm text-gray-600">
                        View and manage all topics
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/admin/lessons"
                  className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                  <div className="relative flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <FiPlus className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        Manage Lessons
                      </h3>
                      <p className="text-sm text-gray-600">
                        View and manage all lessons
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Lessons by Level */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span> Lessons Overview
              </h2>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  {Object.keys(stats.lessonsByLevel).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(stats.lessonsByLevel).map(([level, count]) => (
                        <div key={level} className="flex items-center justify-between group">
                          <span className="text-gray-700 font-semibold capitalize flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                            {level} Level
                          </span>
                          <div className="flex items-center space-x-3">
                            <div className="w-48 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 group-hover:scale-x-105"
                                style={{
                                  width: `${stats.totalLessons > 0 ? (count / stats.totalLessons) * 100 : 0}%`,
                                }}
                              />
                            </div>
                            <span className="text-gray-900 font-bold w-8 text-right">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📚</div>
                      <p className="text-gray-600 font-medium mb-2">
                        No lessons created yet
                      </p>
                      <Link
                        to="/admin/lessons"
                        className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        <FiPlus />
                        Create your first lesson
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            {stats.totalTopics > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-sm text-blue-600 font-medium mb-1">Average Lessons per Topic</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {(stats.totalLessons / stats.totalTopics).toFixed(1)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-green-600 font-medium mb-1">Topics Published</p>
                  <p className="text-2xl font-bold text-green-900">
                    {stats.totalTopics > 0 ? ((stats.publishedTopics / stats.totalTopics) * 100).toFixed(0) : 0}%
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <p className="text-sm text-purple-600 font-medium mb-1">Lessons Published</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {stats.totalLessons > 0 ? ((stats.publishedLessons / stats.totalLessons) * 100).toFixed(0) : 0}%
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
