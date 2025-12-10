import express from 'express';
import { 
  getTopics, 
  getTopicBySlug 
} from '../controllers/topicController.js';

const router = express.Router();

// Public routes
router.get('/', getTopics);
router.get('/:slug', getTopicBySlug);

export default router;
