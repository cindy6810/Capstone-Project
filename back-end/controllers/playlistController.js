const db = require('../db');
const { createPlaylistModel, getPlaylistsFromDb } = require('../models/playlist'); 


// Controller to handle fetching all playlists
const getAllPlaylists = async (req, res) => {
  try {
    // Using the db query method to fetch playlists
    const playlists = await db.query('SELECT * FROM playlists');
    res.json(playlists); // Send the fetched playlists as JSON
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

// Controller to handle creating a new playlist
const createPlaylist = async (req, res) => {
  try {
    const { name, songs } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    // Insert playlist
    const result = await db.query('INSERT INTO playlists (name) VALUES (?)', [name]);
    const playlistId = result.insertId;

    // Insert songs into playlist_songs table if provided
    if (songs && songs.length > 0) {
      const songValues = songs.map(songId => [playlistId, songId]);
      await db.query('INSERT INTO playlist_songs (playlist_id, song_id) VALUES ?', [songValues]);
    }

    res.status(201).json({ id: playlistId, message: "Playlist created successfully" });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};

module.exports = { createPlaylist, getAllPlaylists };
