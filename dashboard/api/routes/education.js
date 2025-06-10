const express = require('express');
const educationModel = require('../model/education');
const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// List all education entries
router.get('/list', async (req, res) => {
  try {
    const educationData = await educationModel.find().sort({ startDate: -1 });
    res.status(200).json({
      message: 'Education data fetched',
      data: educationData,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Get single education entry by ID
router.get('/:id', async (req, res) => {
  try {
    const educationEntry = await educationModel.findById(req.params.id);
    if (!educationEntry) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    res.status(200).json({
      message: 'Education entry fetched',
      data: educationEntry,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Create new education entry
router.post('/create', async (req, res) => {
  try {
    const newEducation = await educationModel.create(req.body);
    res.status(201).json({
      message: 'Education entry created successfully',
      data: newEducation,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Update education entry
router.put('/update/:id', async (req, res) => {
  try {
    const updatedEducation = await educationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEducation) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    res.status(200).json({
      message: 'Education entry updated successfully',
      data: updatedEducation,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// Delete education entry
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedEducation = await educationModel.findByIdAndDelete(req.params.id);
    if (!deletedEducation) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    res.status(200).json({
      message: 'Education entry deleted successfully',
      data: deletedEducation,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

module.exports = router;
