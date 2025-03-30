import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Waste from '../models/Waste.js';

const router = express.Router();

// Report waste
router.post('/report', protect, async (req, res) => {
  try {
    const waste = await Waste.create({
      ...req.body,
      reportedBy: req.user.id
    });
    res.status(201).json(waste);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all waste reports
router.get('/', protect, async (req, res) => {
  try {
    const wastes = await Waste.find()
      .populate('reportedBy', 'name')
      .populate('assignedTo', 'name')
      .sort('-createdAt');
    res.json(wastes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assign waste collection to worker
router.put('/:id/assign', protect, authorize('admin'), async (req, res) => {
  try {
    const waste = await Waste.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: req.body.workerId,
        status: 'assigned'
      },
      { new: true }
    );
    if (!waste) {
      return res.status(404).json({ message: 'Waste report not found' });
    }
    res.json(waste);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update waste status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const waste = await Waste.findById(req.params.id);
    if (!waste) {
      return res.status(404).json({ message: 'Waste report not found' });
    }

    // Only assigned worker or admin can update status
    if (waste.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    waste.status = req.body.status;
    if (req.body.status === 'collected') {
      waste.collectedAt = Date.now();
    } else if (req.body.status === 'processed') {
      waste.processedAt = Date.now();
    }

    await waste.save();
    res.json(waste);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get worker's assigned waste collections
router.get('/my-assignments', protect, authorize('worker'), async (req, res) => {
  try {
    const wastes = await Waste.find({ assignedTo: req.user.id })
      .populate('reportedBy', 'name')
      .sort('-createdAt');
    res.json(wastes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
