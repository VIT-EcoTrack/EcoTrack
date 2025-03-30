import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new task
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      assignedBy: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update task status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (task.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    task.status = req.body.status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get worker's tasks
router.get('/my-tasks', protect, authorize('worker'), async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('assignedBy', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
