import express from 'express';
import { 
  search, 
  advancedSearch, 
  searchSuggestions 
} from '../controllers/searchController.js';

const router = express.Router();

// Public search routes
router.get('/', search);
router.get('/advanced', advancedSearch);
router.get('/suggestions', searchSuggestions);

export default router;
