const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const { verifyToken } = require('../middleware/auth');

// Register user after signup/login
router.post('/register', verifyToken, async (req, res) => {
  try {
    const userData = {
      id: req.user.uid,
      username: req.body.username || req.user.name || 'User',
      email: req.user.email,
      profile_pic_url: req.user.picture || null
    };
    
    // Check if user exists already
    const existingUser = await UserModel.getById(userData.id);
    
    if (existingUser) {
    
      res.status(200).json({ message: 'User already registered', user: existingUser });
    } else {
      // Create new user
      await UserModel.create(userData);
      res.status(201).json({ message: 'User registered', user: userData });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await UserModel.getById(req.user.uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's liked songs
router.get('/me/likes', verifyToken, async (req, res) => {
  try {
    const songs = await UserModel.getLikedSongs(req.user.uid);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;