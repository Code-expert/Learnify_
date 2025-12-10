import express from 'express';
import { 
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
} from '../../controllers/lessonController.js';
import { protect, adminOnly } from '../../middleware/auth.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect, adminOnly);

router.route('/')
  .get(getAllLessons)
  .post(createLesson);

router.route('/:id')
  .get(getLessonById)
  .put(updateLesson)
  .delete(deleteLesson);

export default router;
