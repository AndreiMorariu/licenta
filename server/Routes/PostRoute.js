import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  appreciatePost,
  updatePost,
  getTimelinePosts,
} from '../Controllers/PostController.js';

const router = express.Router();

router.get('/:id', getPost);
router.get('/:id/timeline', getTimelinePosts);
router.put('/:id', updatePost);
router.put('/:id/like', appreciatePost);
router.post('/', createPost);
router.delete('/:id', deletePost);

export default router;
