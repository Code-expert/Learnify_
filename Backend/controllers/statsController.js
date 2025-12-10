import Topic from '../models/Topic.js';
import Lesson from '../models/Lesson.js';
import User from '../models/User.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalTopics = await Topic.countDocuments();
    const publishedTopics = await Topic.countDocuments({ isPublished: true });
    const totalLessons = await Lesson.countDocuments();
    const publishedLessons = await Lesson.countDocuments({ isPublished: true });
    const totalUsers = await User.countDocuments();

    // Get recent topics
    const recentTopics = await Topic.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug createdAt isPublished');

    // Get recent lessons
    const recentLessons = await Lesson.find()
      .populate('topicId', 'title slug')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug topicId createdAt isPublished');

    // Get lessons by level distribution
    const lessonsByLevel = await Lesson.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalTopics,
          publishedTopics,
          unpublishedTopics: totalTopics - publishedTopics,
          totalLessons,
          publishedLessons,
          unpublishedLessons: totalLessons - publishedLessons,
          totalUsers
        },
        recentTopics,
        recentLessons,
        lessonsByLevel: lessonsByLevel.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
