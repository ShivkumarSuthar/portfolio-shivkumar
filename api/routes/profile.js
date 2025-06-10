const express = require('express');
const profileModel = require('../model/profileOverview');

const router = express.Router();

/**
 * CREATE profile (only one allowed)
 */
router.post('/create', async (req, res) => {
  try {
    const existingProfile = await profileModel.findOne();
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const {
      fullName,
      title,
      bio,
      email,
      phone,
      location,
      profileImage,
      logoIsImage,
      logoText,
      logoUrl,
      links,
    } = req.body;

    let parsedLinks = {};
    if (links) {
      try {
        parsedLinks = JSON.parse(links);
      } catch {
        return res.status(400).json({ message: 'Invalid links JSON' });
      }
    }

    let logo = null;
    if (logoIsImage === 'true') {
      if (!logoUrl) {
        return res.status(400).json({ message: 'Logo URL missing for image' });
      }
      logo = {
        isImage: true,
        value: logoUrl,
      };
    } else {
      if (!logoText) {
        return res.status(400).json({ message: 'Logo text missing' });
      }
      logo = {
        isImage: false,
        value: logoText,
      };
    }

    const newProfile = await profileModel.create({
      fullName,
      title,
      bio,
      email,
      phone,
      location,
      profileImage: profileImage || '',
      logo,
      links: parsedLinks,
    });

    res.status(201).json({
      message: 'Profile created successfully',
      data: newProfile,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * GET profile (fetch single profile)
 */
router.get('/get', async (req, res) => {
  try {
    const profile = await profileModel.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({
      message: 'Profile fetched successfully',
      data: profile,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * UPDATE profile (update existing profile)
 */
router.put('/update/:id', async (req, res) => {
  try {
    const {
      fullName,
      title,
      bio,
      email,
      phone,
      location,
      profileImage,
      logoIsImage,
      logoText,
      logoUrl,
      links,
    } = req.body;

    let parsedLinks = {};
    if (links) {
      try {
        parsedLinks = JSON.parse(links);
      } catch {
        return res.status(400).json({ message: 'Invalid links JSON' });
      }
    }

    let logo = null;
    if (logoIsImage === 'true') {
      if (!logoUrl) {
        return res.status(400).json({ message: 'Logo URL missing for image' });
      }
      logo = {
        isImage: true,
        value: logoUrl,
      };
    } else {
      if (!logoText) {
        return res.status(400).json({ message: 'Logo text missing' });
      }
      logo = {
        isImage: false,
        value: logoText,
      };
    }

    const updatedProfile = await profileModel.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        title,
        bio,
        email,
        phone,
        location,
        profileImage: profileImage || '',
        logo,
        links: parsedLinks,
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      data: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * DELETE profile
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedProfile = await profileModel.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      message: 'Profile deleted successfully',
      data: deletedProfile,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
