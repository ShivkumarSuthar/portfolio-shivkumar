const mongoose = require('mongoose');

const workHistorySchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null, // null means currently working
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      trim: true,
    },
    responsibilities: {
      type: [String], // List of key responsibilities or achievements
      default: [],
    },
    techStack: {
      type: [String], // Technologies used in this role
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkHistory', workHistorySchema);
