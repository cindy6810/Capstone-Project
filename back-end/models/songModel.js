const db = require('../db');

const SongModel = {
  create: async (songData) => {
    const sql = `
      INSERT INTO songs (title, artistName, genre, fileUrl, duration, plays_count, likes_count, song_photo_url)
      VALUES (?, ?, ?, ?, ?, 0, 0, ?)
    `;
    const params = [
      songData.title,
      songData.artistName,
      songData.genre,
      songData.fileUrl,
      songData.duration,
      songData.song_photo_url
    ];
    return await db.query(sql, params);
  },

  getAll: async () => {
    return await db.query('SELECT * FROM songs ORDER BY created_at DESC');
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM songs WHERE id = ?';
    const results = await db.query(sql, [id]);
    return results[0];
  }
};

module.exports = SongModel;