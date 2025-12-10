import Topic from '../models/Topic.js';
import Lesson from '../models/Lesson.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    console.log('📊 Getting admin stats...');

    // Get total topics
    const totalTopics = await Topic.countDocuments();
    console.log('Total Topics:', totalTopics);
    
    // Get published topics
    const publishedTopics = await Topic.countDocuments({ isPublished: true });
    console.log('Published Topics:', publishedTopics);
    
    // Get total lessons
    const totalLessons = await Lesson.countDocuments();
    console.log('Total Lessons:', totalLessons);
    
    // Get published lessons
    const publishedLessons = await Lesson.countDocuments({ isPublished: true });
    console.log('Published Lessons:', publishedLessons);
    
    // Get lessons by level
    const lessonsByLevel = await Lesson.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('Lessons by level:', lessonsByLevel);

    // Transform lessonsByLevel to object
    const lessonsByLevelObj = {};
    lessonsByLevel.forEach(item => {
      const level = item._id || 'unknown';
      lessonsByLevelObj[level.toLowerCase()] = item.count;
    });

    const stats = {
      totalTopics,
      publishedTopics,
      totalLessons,
      publishedLessons,
      lessonsByLevel: lessonsByLevelObj,
    };

    console.log('✅ Final stats:', stats);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('❌ Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
