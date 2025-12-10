import Lesson from '../models/Lesson.js';
import Topic from '../models/Topic.js';

// @desc    Get all published lessons (Public)
// @route   GET /api/lessons
// @access  Public
export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ isPublished: true })
      .populate('topicId', 'title slug icon color')
      .sort({ order: 1, createdAt: -1 })
      .select('-createdBy');

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single lesson by slug (Public)
// @route   GET /api/lessons/:slug
// @access  Public
export const getLessonBySlug = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    }).populate('topicId', 'title slug icon color');

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    // Get previous and next lessons in the same topic
    const allLessonsInTopic = await Lesson.find({ 
      topicId: lesson.topicId, 
      isPublished: true 
    })
      .sort({ order: 1, createdAt: 1 })
      .select('_id title slug');

    const currentIndex = allLessonsInTopic.findIndex(
      l => l._id.toString() === lesson._id.toString()
    );

    const previousLesson = currentIndex > 0 ? allLessonsInTopic[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessonsInTopic.length - 1 ? allLessonsInTopic[currentIndex + 1] : null;

    res.status(200).json({
      success: true,
      data: {
        ...lesson.toObject(),
        navigation: {
          previous: previousLesson,
          next: nextLesson
        }
      }
    });
  } catch (error) {
    console.error('Get lesson by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get lessons by topic slug (Public)
// @route   GET /api/lessons/topic/:topicSlug
// @access  Public
export const getLessonsByTopic = async (req, res) => {
  try {
    // Find topic first
    const topic = await Topic.findOne({ slug: req.params.topicSlug });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Get lessons for this topic
    const lessons = await Lesson.find({ 
      topicId: topic._id, 
      isPublished: true 
    })
      .sort({ order: 1, createdAt: 1 })
      .select('-content -createdBy'); // Exclude full content for listing

    res.status(200).json({
      success: true,
      count: lessons.length,
      topic: {
        _id: topic._id,
        title: topic.title,
        slug: topic.slug,
        icon: topic.icon,
        color: topic.color
      },
      data: lessons
    });
  } catch (error) {
    console.error('Get lessons by topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all lessons (Admin - includes unpublished)
// @route   GET /api/admin/lessons
// @access  Private/Admin
export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate('topicId', 'title slug icon color')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    console.error('Get all lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single lesson by ID (Admin)
// @route   GET /api/admin/lessons/:id
// @access  Private/Admin
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('topicId', 'title slug icon color')
      .populate('createdBy', 'name email');

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    console.error('Get lesson by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new lesson
// @route   POST /api/admin/lessons
// @access  Private/Admin
export const createLesson = async (req, res) => {
  try {
    const { 
      topicId, 
      title, 
      slug, 
      level, 
      content, 
      sampleCode, 
      order, 
      isPublished 
    } = req.body;

    // Validation
    if (!topicId || !title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide topicId, title, slug, and content'
      });
    }

    // Check if topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Check if slug already exists for this topic
    const slugExists = await Lesson.findOne({ topicId, slug });
    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: 'Lesson with this slug already exists in this topic'
      });
    }

    // Create lesson
    const lesson = await Lesson.create({
      topicId,
      title,
      slug: slug.toLowerCase(),
      level: level || 'beginner',
      content,
      sampleCode: sampleCode || '',
      order: order || 0,
      isPublished: isPublished !== undefined ? isPublished : true,
      createdBy: req.user._id
    });

    // Populate topic info before sending response
    await lesson.populate('topicId', 'title slug icon color');

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: lesson
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Lesson with this slug already exists in this topic'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update lesson
// @route   PUT /api/admin/lessons/:id
// @access  Private/Admin
export const updateLesson = async (req, res) => {
  try {
    let lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    // If topicId is being updated, check if topic exists
    if (req.body.topicId && req.body.topicId !== lesson.topicId.toString()) {
      const topic = await Topic.findById(req.body.topicId);
      if (!topic) {
        return res.status(404).json({
          success: false,
          message: 'Topic not found'
        });
      }
    }

    // If slug is being updated, check if new slug exists in the topic
    if (req.body.slug && req.body.slug !== lesson.slug) {
      const topicId = req.body.topicId || lesson.topicId;
      const slugExists = await Lesson.findOne({ 
        topicId, 
        slug: req.body.slug,
        _id: { $ne: req.params.id } 
      });
      
      if (slugExists) {
        return res.status(400).json({
          success: false,
          message: 'Lesson with this slug already exists in this topic'
        });
      }
    }

    // Update lesson
    lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('topicId', 'title slug icon color');

    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      data: lesson
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete lesson
// @route   DELETE /api/admin/lessons/:id
// @access  Private/Admin
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    await lesson.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
