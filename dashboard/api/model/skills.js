const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    cat_description:{
      type:String,
       trim: true,
    },
    skills: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        level: {
          type: String, // e.g., Beginner, Intermediate, Expert
          trim: true,
        },
        experienceYears: {
          type: Number,
          default: 0,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillCategory', skillSchema);
