const express = require('express');
const { createPlaylist, getAllPlaylists } = require('../controllers/playlistController');

const router = express.Router();

// POST route to create a new playlist
router.post('/', createPlaylist);

// GET route to fetch all playlists
router.get('/', getAllPlaylists);

module.exports = router;
