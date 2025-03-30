import mongoose from 'mongoose';

const wasteSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['plastic', 'paper', 'metal', 'glass', 'organic', 'electronic', 'other'],
    required: true
  },
  quantity: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['kg', 'pieces'],
      required: true
    }
  },
  location: {
    address: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  status: {
    type: String,
    enum: ['reported', 'assigned', 'collected', 'processed'],
    default: 'reported'
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [{
    type: String // URLs to waste images
  }],
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  collectedAt: Date,
  processedAt: Date
});

export default mongoose.model('Waste', wasteSchema);
