const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { upload } = require('../middleware/upload');
const { verifyToken } = require('../middleware/auth');
const UserModel = require('../models/userModel');
const db = require('../db');
const likesController = require('../controllers/likesController');
//upload song route
router.post('/upload', upload, songController.upload);

router.get('/', songController.getAllSongs);
router.get('/:id', songController.getSongById);
    
router.get('/:id/like', verifyToken, likesController.checkLike);
router.post('/:id/like', verifyToken, likesController.toggleLike);



module.exports = router;