import express from 'express';
import { getDashboardStats } from '../../controllers/statsController.js';
import { protect, adminOnly } from '../../middleware/auth.js';

const router = express.Router();

// Protected admin route
router.get('/', protect, adminOnly, getDashboardStats);

export default router;
