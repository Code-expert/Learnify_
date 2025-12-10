import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiBook, FiClock } from 'react-icons/fi';
import apiClient from '../utils/apiClient';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchTopics();
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const fetchTopics = async () => {
    try {
      const response = await apiClient.get('/topics');
      console.log('Topics fetched:', response.data);
      setTopics(response.data.data || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setTopics([]);
    }
  };

  const performSearch = async (searchTerm = searchQuery) => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await apiClient.get('/search', {
        params: {
          q: searchTerm,
          topic: selectedTopic !== 'all' ? selectedTopic : undefined,
          difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined,
        },
      });

      console.log('Search results:', response.data);
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  // Filter results based on selected filters
  const filteredResults = results.filter((lesson) => {
    const matchesTopic = selectedTopic === 'all' || 
                        lesson.topicId === selectedTopic || 
                        lesson.topic?._id === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             lesson.level?.toLowerCase() === selectedDifficulty.toLowerCase() ||
                             lesson.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesTopic && matchesDifficulty;
  });

  // Helper function to safely get topic info
  const getTopicInfo = (lesson) => {
    if (lesson.topic && typeof lesson.topic === 'object') {
      return lesson.topic;
    }
    const topicId = lesson.topicId || lesson.topic;
    if (Array.isArray(topics) && topics.length > 0) {
      return topics.find(t => t._id === topicId) || { title: 'Unknown', icon: '📚' };
    }
    return { title: 'Unknown', icon: '📚' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Search Tutorials
          </h1>
          <p className="text-gray-600 text-lg">
            Find the perfect lesson for your learning journey
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for tutorials, topics, or keywords..."
              className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all shadow-sm"
            />
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FiFilter />
              Filters
            </h3>
            <button
              onClick={() => {
                setSelectedTopic('all');
                setSelectedDifficulty('all');
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Topic Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Topics</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTopic('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedTopic === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All Topics
              </button>
              {topics && topics.length > 0 ? (
                topics.map((topic) => (
                  <button
                    key={topic._id}
                    onClick={() => setSelectedTopic(topic._id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedTopic === topic._id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {topic.icon || '📚'} {topic.title}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Loading topics...</p>
              )}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${
                    selectedDifficulty === level
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Searching...</p>
            </div>
          ) : hasSearched ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found <span className="font-semibold text-primary-600">{filteredResults.length}</span> results
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {filteredResults.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((lesson) => {
                    const topicInfo = getTopicInfo(lesson);
                    
                    return (
                      <Link
                        key={lesson._id}
                        to={`/lesson/${lesson.slug}`}
                        className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-3xl">{topicInfo.icon}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            (lesson.level || lesson.difficulty)?.toLowerCase() === 'beginner'
                              ? 'bg-green-100 text-green-700'
                              : (lesson.level || lesson.difficulty)?.toLowerCase() === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {lesson.level || lesson.difficulty || 'Beginner'}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {lesson.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {lesson.description || 'No description available'}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FiBook className="text-primary-500" />
                            {topicInfo.title}
                          </span>
                          {lesson.duration && (
                            <span className="flex items-center gap-1">
                              <FiClock className="text-primary-500" />
                              {lesson.duration} min
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Start your search
              </h3>
              <p className="text-gray-600">
                Enter a keyword to find relevant tutorials
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
