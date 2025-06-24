const express = require('express');
const router = express.Router();
const projectModel = require('../model/project'); // Adjust path as needed

router.post('/add', async (req, res) => {
  const { title, description, techStack, image, liveUrl, githubUrl, order, featured } = req.body;

  try {
    const projectData = await projectModel.create({
      title,
      description,
      techStack,
      image,
      liveUrl,
      githubUrl,
      order,
      featured,
    });

    res.status(201).json({ message: 'Project created successfully', project: projectData });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const projectList = await projectModel.find()
    res.status(200).json({ message: 'project list fetched successfully', data: projectList })
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
  const projectList = await projectModel.find()
})

router.put('/update/:id', async (req, res) => {
  try {
    const updatedProject = await projectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project: updatedProject });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
})


router.delete('/remove/:id', async (req, res) => {

  try {
    const deletedProject = await projectModel.findByIdAndDelete(req.params.id)
    if (!deletedProject) {
      res.status(400).send('project not found')
    }
    res.status(200).json({
      message: 'Deleted successfully',
      data: deletedProject
    })
  } catch (err) {
    res.status(500).json({
      message: 'something went wrong',
      error: err
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Missing project ID in query' });
    }

    const projectData = await projectModel.findOne({ _id: id });

    if (projectData) {
      res.status(200).json({ data: projectData });
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message || err,
    });
  }
});



module.exports = router;
