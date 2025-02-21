const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { upload } = require('../middleware/upload');

router.post('/upload', 
  upload.fields([
    { name: 'song', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]), 
  songController.upload
);

router.get('/', songController.getAllSongs);

module.exports = router;