import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createLesson, updateLesson, deleteLesson } from '../../redux/slices/lessonsSlice';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import Loader from '../../components/common/Loader';
import apiClient from '../../redux/api/apiClient';

const ManageLessons = () => {
    const dispatch = useDispatch();
    const { topics } = useSelector((state) => state.topics);

    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        sampleCode: '',
        topic: '',
        order: 1,
        difficulty: 'Beginner',
        duration: 15,
        isPublished: true,
    });

    useEffect(() => {
        fetchTopics();
        fetchLessons();
    }, []);

    const fetchTopics = async () => {
    try {
      const response = await apiClient.get('/admin/topics');
      console.log('Topics fetched:', response.data);
      dispatch({ type: 'topics/getAll/fulfilled', payload: response.data });
    } catch (error) {
      console.error('Error fetching topics:', error);
      dispatch({ type: 'topics/getAll/fulfilled', payload: { data: [] } });
    }
  };

    const fetchLessons = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/admin/lessons');
            console.log('Lessons response:', response.data);
            setLessons(response.data.data || []);
        } catch (error) {
            console.error('Error fetching lessons:', error);
            setLessons([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (lesson = null) => {
        if (lesson) {
            setEditingLesson(lesson);
            setFormData({
                title: lesson.title,
                slug: lesson.slug,
                description: lesson.description || '',
                content: lesson.content,
                sampleCode: lesson.sampleCode || '',
                topic: lesson.topic?._id || lesson.topicId || lesson.topic,
                order: lesson.order,
                difficulty: lesson.difficulty || lesson.level || 'Beginner',
                duration: lesson.duration || 15,
                isPublished: lesson.isPublished,
            });
        } else {
      setEditingLesson(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        content: '',
        sampleCode: '',
        topic: Array.isArray(topics) && topics.length > 0 ? topics[0]._id : '',
        order: 1,
        difficulty: 'Beginner',
        duration: 15,
        isPublished: true,
      });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingLesson(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // Auto-generate slug from title
        if (name === 'title' && !editingLesson) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData((prev) => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const lessonData = {
      ...formData,
      topicId: formData.topic, 
    };
    
    delete lessonData.topic;
    
    console.log('Submitting lesson data:', lessonData);
    
    if (editingLesson) {
      await dispatch(updateLesson({ id: editingLesson._id, lessonData })).unwrap();
    } else {
      await dispatch(createLesson(lessonData)).unwrap();
    }
    handleCloseModal();
    fetchLessons();
  } catch (error) {
    console.error('Error saving lesson:', error);
    alert('Failed to save lesson: ' + (error.message || 'Unknown error'));
  }
};


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            try {
                await dispatch(deleteLesson(id)).unwrap();
                fetchLessons();
            } catch (error) {
                console.error('Error deleting lesson:', error);
                alert('Failed to delete lesson');
            }
        }
    };

    const filteredLessons = Array.isArray(lessons) ? lessons.filter((lesson) => {
    const matchesSearch = lesson.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const lessonTopicId = lesson.topic?._id || lesson.topicId;
    const matchesTopic = selectedTopic === 'all' || lessonTopicId === selectedTopic;
    return matchesSearch && matchesTopic;
  }) : [];

    // Helper function to get topic info
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
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />

            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                            Manage Lessons
                        </h1>
                        <p className="text-gray-600">Create and manage lesson content</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        <FiPlus />
                        <span>Add Lesson</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            placeholder="Search lessons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                        />
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    </div>

                    {/* Topic Filter */}
                    <select
  value={selectedTopic}
  onChange={(e) => setSelectedTopic(e.target.value)}
  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
>
  <option value="all">All Topics</option>
  {topics && topics.length > 0 ? (
    topics.map((topic) => (
      <option key={topic._id} value={topic._id}>
        {topic.icon || '📚'} {topic.title}
      </option>
    ))
  ) : (
    <option value="" disabled>Loading topics...</option>
  )}
</select>

                </div>

                {/* Lessons Table */}
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Order
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Topic
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Difficulty
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredLessons.map((lesson) => {
                                        const topicInfo = getTopicInfo(lesson);
                                        return (
                                            <tr key={lesson._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-gray-900">{lesson.order}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-900">{lesson.title}</div>
                                                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-blue-600">
                                                        {lesson.slug}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xl">{topicInfo.icon}</span>
                                                        <span className="text-sm text-gray-600">{topicInfo.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600 capitalize">
                                                        {lesson.difficulty || lesson.level || 'Beginner'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${lesson.isPublished
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                            }`}
                                                    >
                                                        {lesson.isPublished ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button
                                                            onClick={() => handleOpenModal(lesson)}
                                                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                        >
                                                            <FiEdit2 />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(lesson._id)}
                                                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {filteredLessons.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No lessons found</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal - Keep your existing modal code */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <FiX className="text-2xl text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        placeholder="e.g., HTML Introduction"
                                    />
                                </div>

                                {/* Slug & Topic Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Slug *
                                        </label>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="e.g., html-introduction"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Topic *
                                        </label>
                                        <select
  name="topic"
  value={formData.topic}
  onChange={handleChange}
  required
  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
>
  <option value="">Select a topic</option>
  {topics && topics.length > 0 ? (
    topics.map((topic) => (
      <option key={topic._id} value={topic._id}>
        {topic.icon || '📚'} {topic.title}
      </option>
    ))
  ) : (
    <option value="" disabled>Loading topics...</option>
  )}
</select>


                                    </div>
                                </div>

                                {/* Order & Difficulty Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Order
                                        </label>
                                        <input
                                            type="number"
                                            name="order"
                                            value={formData.order}
                                            onChange={handleChange}
                                            min="1"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Difficulty
                                        </label>
                                        <select
                                            name="difficulty"
                                            value={formData.difficulty}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                                        placeholder="Brief description..."
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Lesson Content (HTML) *
                                    </label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        required
                                        rows="10"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none font-mono text-sm"
                                        placeholder="<h2>Introduction</h2><p>Content here...</p>"
                                    />
                                </div>

                                {/* Sample Code */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sample Code (Optional)
                                    </label>
                                    <textarea
                                        name="sampleCode"
                                        value={formData.sampleCode}
                                        onChange={handleChange}
                                        rows="6"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none font-mono text-sm"
                                        placeholder="<!DOCTYPE html>..."
                                    />
                                </div>

                                {/* Published Status */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={formData.isPublished}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="text-sm font-semibold text-gray-700">
                                        Publish this lesson
                                    </label>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center justify-end space-x-3 pt-4 sticky bottom-0 bg-white pb-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                    >
                                        {editingLesson ? 'Update Lesson' : 'Create Lesson'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageLessons;
