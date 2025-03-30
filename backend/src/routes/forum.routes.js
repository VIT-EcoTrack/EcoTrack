import express from 'express';
import { protect } from '../middleware/auth.js';
import Forum from '../models/Forum.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Forum.find()
      .populate('author', 'name')
      .populate('comments.author', 'name')
      .sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create post
router.post('/', protect, async (req, res) => {
  try {
    const post = await Forum.create({
      ...req.body,
      author: req.user.id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add comment
router.post('/:id/comments', protect, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      content: req.body.content,
      author: req.user.id
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/Unlike post
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user.id);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1); // Unlike
    } else {
      post.likes.push(req.user.id); // Like
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
