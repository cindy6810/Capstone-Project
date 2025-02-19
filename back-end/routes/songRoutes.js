const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { upload } = require('../middleware/upload');

router.post('/upload', upload.single('song'), songController.upload);
router.get('/', songController.getAllSongs);

module.exports = router;