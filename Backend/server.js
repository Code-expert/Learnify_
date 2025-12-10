import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import topicRoutes from './routes/topics.js';
import lessonRoutes from './routes/lessons.js';
import searchRoutes from './routes/search.js';  // ← NEW
import adminTopicRoutes from './routes/admin/topics.js';
import adminLessonRoutes from './routes/admin/lessons.js';
import adminStatsRoutes from './routes/admin/stats.js';
import adminRoutes from './routes/adminRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/search', searchRoutes);  // ← NEW
app.use('/api/admin/topics', adminTopicRoutes);
app.use('/api/admin/lessons', adminLessonRoutes);
app.use('/api/admin/stats', adminStatsRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Welcome to Learnify API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      topics: '/api/topics',
      lessons: '/api/lessons',
      search: '/api/search',
      adminTopics: '/api/admin/topics',
      adminLessons: '/api/admin/lessons'
    }
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Learnify Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
