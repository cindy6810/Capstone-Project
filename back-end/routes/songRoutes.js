const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { upload } = require('../middleware/upload');

router.post('/upload', upload, songController.upload);

router.get('/', songController.getAllSongs);
router.get('/:id', songController.getSongById);

module.exports = router;