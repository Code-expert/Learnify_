import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { getAdminStats } from '../controllers/adminController.js';
import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../controllers/topicController.js';
import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController.js';

const router = express.Router();

// IMPORTANT: Stats route MUST come BEFORE any :id routes
router.get('/stats', protect, adminOnly, getAdminStats);

// Topic routes
router.route('/topics')
  .get(protect, adminOnly, getTopics)
  .post(protect, adminOnly, createTopic);

router.route('/topics/:id')
  .put(protect, adminOnly, updateTopic)
  .delete(protect, adminOnly, deleteTopic);

// Lesson routes
router.route('/lessons')
  .get(protect, adminOnly, getLessons)
  .post(protect, adminOnly, createLesson);

router.route('/lessons/:id')
  .put(protect, adminOnly, updateLesson)
  .delete(protect, adminOnly, deleteLesson);

export default router;
