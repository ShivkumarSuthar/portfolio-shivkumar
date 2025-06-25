const express = require('express');
const router = express.Router();

// Import all models
const projectModel = require('../model/project');            // your project model
const workHistoryModel = require('../model/workHistory');    // your work history model
const skillModel = require('../model/skills');                // your skill model
// const testimonialModel = require('../model/testimonial');    // if you have this

// GET Dashboard Overview
router.get('/', async (req, res) => {
  try {
    // Get counts
    const totalProjects = await projectModel.countDocuments();
    const workExperienceCount = await workHistoryModel.countDocuments();
    const skillsCount = await skillModel.aggregate([
      { $unwind: '$skills' }, // flatten skills array
      { $count: 'count' },
    ]);
    const totalSkills = skillsCount.length > 0 ? skillsCount[0].count : 0;

    // const testimonialsCount = await testimonialModel.countDocuments();

    // Get recent projects (limit 3)
    const recentProjects = await projectModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)

    // Get recent work history (limit 2)
    const recentWorkHistory = await workHistoryModel
      .find({})
      .sort({ startDate: -1 })
      .limit(2)

    // Send response
    res.status(200).json({
      message: 'Dashboard data fetched successfully',
      data: {
        totalProjects,
        workExperienceCount,
        totalSkills,
        // testimonialsCount,
        recentProjects,
        recentWorkHistory,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
