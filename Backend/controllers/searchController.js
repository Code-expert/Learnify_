
import Topic from '../models/Topic.js';
import Lesson from '../models/Lesson.js';

// @desc    Search topics and lessons
// @route   GET /api/search?q=keyword
// @access  Public
export const search = async (req, res) => {
  try {
    const { q } = req.query;

    // Validate search query
    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const searchQuery = q.trim();

    // Search in topics (title, description)
    const topics = await Topic.find({
      isPublished: true,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    })
      .select('title slug description icon color')
      .limit(10);

    // Search in lessons (title, content)
    const lessons = await Lesson.find({
      isPublished: true,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } }
      ]
    })
      .populate('topicId', 'title slug icon color')
      .select('title slug level topicId')
      .limit(20);

    // Calculate total results
    const totalResults = topics.length + lessons.length;

    res.status(200).json({
      success: true,
      query: searchQuery,
      totalResults,
      data: {
        topics,
        lessons
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Advanced search with filters
// @route   GET /api/search/advanced
// @access  Public
export const advancedSearch = async (req, res) => {
  try {
    const { q, type, level, topicSlug } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const searchQuery = q.trim();
    let results = { topics: [], lessons: [] };

    // Search topics
    if (!type || type === 'topic') {
      const topicQuery = {
        isPublished: true,
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } }
        ]
      };

      results.topics = await Topic.find(topicQuery)
        .select('title slug description icon color')
        .limit(10);
    }

    // Search lessons
    if (!type || type === 'lesson') {
      const lessonQuery = {
        isPublished: true,
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } }
        ]
      };

      // Filter by level if provided
      if (level) {
        lessonQuery.level = level;
      }

      // Filter by topic if provided
      if (topicSlug) {
        const topic = await Topic.findOne({ slug: topicSlug });
        if (topic) {
          lessonQuery.topicId = topic._id;
        }
      }

      results.lessons = await Lesson.find(lessonQuery)
        .populate('topicId', 'title slug icon color')
        .select('title slug level topicId')
        .limit(20);
    }

    const totalResults = results.topics.length + results.lessons.length;

    res.status(200).json({
      success: true,
      query: searchQuery,
      filters: { type, level, topicSlug },
      totalResults,
      data: results
    });
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get search suggestions (autocomplete)
// @route   GET /api/search/suggestions?q=keyword
// @access  Public
export const searchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    const searchQuery = q.trim();

    // Get topic suggestions
    const topicSuggestions = await Topic.find({
      isPublished: true,
      title: { $regex: `^${searchQuery}`, $options: 'i' }
    })
      .select('title slug icon')
      .limit(5);

    // Get lesson suggestions
    const lessonSuggestions = await Lesson.find({
      isPublished: true,
      title: { $regex: `^${searchQuery}`, $options: 'i' }
    })
      .populate('topicId', 'title slug')
      .select('title slug topicId')
      .limit(5);

    // Format suggestions
    const suggestions = [
      ...topicSuggestions.map(topic => ({
        type: 'topic',
        title: topic.title,
        slug: topic.slug,
        icon: topic.icon
      })),
      ...lessonSuggestions.map(lesson => ({
        type: 'lesson',
        title: lesson.title,
        slug: lesson.slug,
        topic: lesson.topicId.title
      }))
    ];

    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
