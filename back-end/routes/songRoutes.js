const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { upload } = require('../middleware/upload');
const { verifyToken } = require('../middleware/auth');
const UserModel = require('../models/userModel');
const db = require('../db');
const likesController = require('../controllers/likesController');
//upload song route
router.post('/upload', verifyToken, upload, songController.upload);

router.get('/recently-played', verifyToken, songController.getRecentlyPlayed);
router.get('/', songController.getAllSongs);
router.get('/myUploads', verifyToken, songController.getMyUploads);
router.post('/:id/play', verifyToken, songController.recordSongPlay);
router.get('/:id', songController.getSongById);

// Search song
router.get('/search', songController.searchSongs);

//like routes
router.get('/:id/like', verifyToken, likesController.checkLike);
router.post('/:id/like', verifyToken, likesController.toggleLike);



module.exports = router;