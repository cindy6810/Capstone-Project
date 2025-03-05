const db = require('../db'); // Ensure you're using the correct database connection

// Function to fetch all playlists from the database
const getPlaylistsFromDb = () => {
  const query = 'SELECT * FROM playlists';
  return db.promise().query(query); 
};


// Function to create a playlist
const createPlaylist = (user_id, title, created_at) => {
  const query = 'INSERT INTO playlists (id, user_id, title, created_at) VALUES (?, ?, ?, ?)';
  return db.promise().query(query, [user_id, title, created_at]);
};

module.exports = {
  createPlaylist,
  getPlaylistsFromDb
};
