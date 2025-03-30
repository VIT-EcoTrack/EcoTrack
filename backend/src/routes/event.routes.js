import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Event from '../models/Event.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name')
      .populate('participants', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create event
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizer: req.user.id
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Join event
router.post('/:id/join', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already joined' });
    }

    event.participants.push(req.user.id);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update event status
router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
