import { Router } from 'express';
import { listPosts, listAllPosts, getPostBySlug, createPost } from '../controllers/blog.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listPosts);
router.get('/all', requireAuth, requireAdmin, listAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', requireAuth, requireAdmin, createPost);

export default router;
