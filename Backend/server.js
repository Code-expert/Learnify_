import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import topicRoutes from './routes/topics.js';
import lessonRoutes from './routes/lessons.js';
import searchRoutes from './routes/search.js';
import adminTopicRoutes from './routes/admin/topics.js';
import adminLessonRoutes from './routes/admin/lessons.js';
import adminStatsRoutes from './routes/admin/stats.js';
import adminRoutes from './routes/adminRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Enhanced CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://learnify-olive.vercel.app',
  'https://learnify.vercel.app',
  // Add your production domain when ready
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('⚠️  Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600, // 10 minutes
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.get('origin') || 'No origin'}`);
    next();
  });
}

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/search', searchRoutes);
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
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      topics: '/api/topics',
      lessons: '/api/lessons',
      search: '/api/search',
      admin: {
        topics: '/api/admin/topics',
        lessons: '/api/admin/lessons',
        stats: '/api/admin/stats'
      }
    }
  });
});

// API status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy: Origin not allowed',
      origin: req.get('origin')
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Learnify Server Started`);
  console.log(`📡 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌍 Port: ${PORT}`);
  console.log(`✅ CORS Enabled for:`);
  allowedOrigins.forEach(origin => {
    if (origin) console.log(`   - ${origin}`);
  });
  console.log('=================================');
});

export default app;
