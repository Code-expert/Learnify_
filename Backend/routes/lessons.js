import express from 'express';
import { 
  getLessons, 
  getLessonBySlug,
  getLessonsByTopic
} from '../controllers/lessonController.js';

const router = express.Router();

// Public routes
router.get('/', getLessons);
router.get('/topic/:topicSlug', getLessonsByTopic);
router.get('/:slug', getLessonBySlug);
// @desc    Get lesson by slug with navigation
// @route   GET /api/lessons/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const lesson = await lesson.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    }).populate('topic', 'title slug icon');

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Get previous and next lessons in same topic
    const prevLesson = await Lesson.findOne({
      topic: lesson.topic._id,
      order: { $lt: lesson.order },
      isPublished: true,
    })
      .sort({ order: -1 })
      .select('title slug');

    const nextLesson = await Lesson.findOne({
      topic: lesson.topic._id,
      order: { $gt: lesson.order },
      isPublished: true,
    })
      .sort({ order: 1 })
      .select('title slug');

    res.status(200).json({
      success: true,
      data: {
        lesson,
        topic: lesson.topic,
        prevLesson,
        nextLesson,
      },
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

export default router;
