const express = require('express');
const skillsModel = require('../model/skills');
const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// List all skill categories
router.get('/list', async (req, res) => {
  try {
    const skillsData = await skillsModel.find();
    res.status(200).json({
      message: 'Skills data fetched',
      data: skillsData,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Get skill category by ID
router.get('/:id', async (req, res) => {
  try {
    const skillEntry = await skillsModel.findById(req.params.id);
    if (!skillEntry) {
      return res.status(404).json({ message: 'Skill category not found' });
    }
    res.status(200).json({
      message: 'Skill category fetched',
      data: skillEntry,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Create new skill category
router.post('/create', async (req, res) => {
  try {
    const newSkillCategory = await skillsModel.create(req.body);
    res.status(201).json({
      message: 'Skill category created successfully',
      data: newSkillCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Update skill category
router.put('/update/:id', async (req, res) => {
  try {
    const updatedSkillCategory = await skillsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSkillCategory) {
      return res.status(404).json({ message: 'Skill category not found' });
    }
    res.status(200).json({
      message: 'Skill category updated successfully',
      data: updatedSkillCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Delete skill category
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedSkillCategory = await skillsModel.findByIdAndDelete(req.params.id);
    if (!deletedSkillCategory) {
      return res.status(404).json({ message: 'Skill category not found' });
    }
    res.status(200).json({
      message: 'Skill category deleted successfully',
      data: deletedSkillCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

module.exports = router;
