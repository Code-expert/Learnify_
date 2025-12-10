import Topic from '../models/Topic.js';
import Lesson from '../models/Lesson.js';

// @desc    Get all published topics (Public)
// @route   GET /api/topics
// @access  Public
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-createdBy');

    // Get lesson count for each topic
    const topicsWithCount = await Promise.all(
      topics.map(async (topic) => {
        const lessonCount = await Lesson.countDocuments({ 
          topicId: topic._id, 
          isPublished: true 
        });
        
        return {
          ...topic.toObject(),
          lessonsCount: lessonCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: topicsWithCount.length,
      data: topicsWithCount
    });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single topic by slug with lessons (Public)
// @route   GET /api/topics/:slug
// @access  Public
export const getTopicBySlug = async (req, res) => {
  try {
    const topic = await Topic.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Get all published lessons for this topic
    const lessons = await Lesson.find({ 
      topicId: topic._id, 
      isPublished: true 
    })
      .sort({ order: 1, createdAt: 1 })
      .select('-content -createdBy'); // Exclude full content for listing

    res.status(200).json({
      success: true,
      data: {
        ...topic.toObject(),
        lessons
      }
    });
  } catch (error) {
    console.error('Get topic by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all topics (Admin - includes unpublished)
// @route   GET /api/admin/topics
// @access  Private/Admin
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .sort({ order: 1, createdAt: -1 })
      .populate('createdBy', 'name email');

    // Get lesson count for each topic
    const topicsWithCount = await Promise.all(
      topics.map(async (topic) => {
        const lessonCount = await Lesson.countDocuments({ 
          topicId: topic._id 
        });
        
        return {
          ...topic.toObject(),
          lessonsCount: lessonCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: topicsWithCount.length,
      data: topicsWithCount
    });
  } catch (error) {
    console.error('Get all topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single topic by ID (Admin)
// @route   GET /api/admin/topics/:id
// @access  Private/Admin
export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Get lessons for this topic
    const lessons = await Lesson.find({ topicId: topic._id })
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: {
        ...topic.toObject(),
        lessons
      }
    });
  } catch (error) {
    console.error('Get topic by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new topic
// @route   POST /api/admin/topics
// @access  Private/Admin
export const createTopic = async (req, res) => {
  try {
    const { title, slug, description, icon, color, order, isPublished } = req.body;

    // Validation
    if (!title || !slug || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, slug, and description'
      });
    }

    // Check if slug already exists
    const slugExists = await Topic.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists. Please use a unique slug.'
      });
    }

    // Create topic
    const topic = await Topic.create({
      title,
      slug: slug.toLowerCase(),
      description,
      icon: icon || '📚',
      color: color || '#3b82f6',
      order: order || 0,
      isPublished: isPublished !== undefined ? isPublished : true,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      data: topic
    });
  } catch (error) {
    console.error('Create topic error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Topic with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update topic
// @route   PUT /api/admin/topics/:id
// @access  Private/Admin
export const updateTopic = async (req, res) => {
  try {
    let topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // If slug is being updated, check if new slug exists
    if (req.body.slug && req.body.slug !== topic.slug) {
      const slugExists = await Topic.findOne({ slug: req.body.slug });
      if (slugExists) {
        return res.status(400).json({
          success: false,
          message: 'Slug already exists. Please use a unique slug.'
        });
      }
    }

    // Update topic
    topic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Topic updated successfully',
      data: topic
    });
  } catch (error) {
    console.error('Update topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete topic
// @route   DELETE /api/admin/topics/:id
// @access  Private/Admin
export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    // Check if topic has lessons
    const lessonCount = await Lesson.countDocuments({ topicId: topic._id });
    
    if (lessonCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete topic. It has ${lessonCount} lesson(s). Please delete lessons first.`
      });
    }

    await topic.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Topic deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
