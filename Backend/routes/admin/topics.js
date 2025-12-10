import express from 'express';
import { 
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic
} from '../../controllers/topicController.js';
import { protect, adminOnly } from '../../middleware/auth.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect, adminOnly);

router.route('/')
  .get(getAllTopics)
  .post(createTopic);

router.route('/:id')
  .get(getTopicById)
  .put(updateTopic)
  .delete(deleteTopic);

export default router;
