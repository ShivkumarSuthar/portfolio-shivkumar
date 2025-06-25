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



// Add or update a skill in a category
router.post('/create', async (req, res) => {
  const { category, cat_description, skills } = req.body;

  try {
    // 1. Check if category already exists
    const existingCategory = await skillsModel.findOne({ category });

    if (existingCategory) {
      // 2. Category exists → Check if skill already exists
      const incomingSkill = skills[0];

      const duplicate = existingCategory.skills.find(
        (s) => s.name.toLowerCase() === incomingSkill.name.toLowerCase()
      );

      if (duplicate) {
        return res.status(400).json({
          message: `Skill "${incomingSkill.name}" already exists in category "${category}".`,
        });
      }

      // 3. Add skill to existing category
      existingCategory.skills.push(incomingSkill);
      await existingCategory.save();

      return res.status(200).json({
        message: 'Skill added to existing category',
        data: existingCategory,
      });
    }

    // 4. Category does not exist → create new
    const newCategory = new skillsModel({
      category,
      cat_description,
      skills,
    });

    await newCategory.save();

    return res.status(201).json({
      message: 'New category with skill created successfully',
      data: newCategory,
    });

  } catch (err) {
    console.error('Skill create error:', err);
    return res.status(500).json({
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
