const express = require('express');
const workModel = require('../model/workHistory');
const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 1️⃣ List all work history
router.get('/list', async (req, res) => {
  try {
    const workData = await workModel.find();
    res.status(200).json({
      message: 'Work history data fetched',
      data: workData,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// 2️⃣ Get a single work entry by ID
router.get('/:id', async (req, res) => {
  try {
    const workEntry = await workModel.findById(req.params.id);
    if (!workEntry) {
      return res.status(404).json({ message: 'Work entry not found' });
    }
    res.status(200).json({
      message: 'Work entry fetched',
      data: workEntry,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// 3️⃣ Create a new work entry
router.post('/create', async (req, res) => {
  try {
    const newWork = await workModel.create(req.body);
    res.status(201).json({
      message: 'Work entry created successfully',
      data: newWork,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// 4️⃣ Update an existing work entry
router.put('/update/:id', async (req, res) => {
  try {
    const updatedWork = await workModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedWork) {
      return res.status(404).json({ message: 'Work entry not found' });
    }

    res.status(200).json({
      message: 'Work entry updated successfully',
      data: updatedWork,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

// 5️⃣ Delete a work entry
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedWork = await workModel.findByIdAndDelete(req.params.id);
    if (!deletedWork) {
      return res.status(404).json({ message: 'Work entry not found' });
    }

    res.status(200).json({
      message: 'Work entry deleted successfully',
      data: deletedWork,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});

module.exports = router;
