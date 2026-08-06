import { Router } from 'express';
import { listPosts, getPostBySlug, createPost } from '../controllers/blog.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listPosts);
router.get('/:slug', getPostBySlug);
router.post('/', requireAuth, requireAdmin, createPost);

export default router;
