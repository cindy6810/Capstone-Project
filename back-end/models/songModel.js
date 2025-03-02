const db = require('../db');

const SongModel = {
  create: async (songData) => {
    const sql = `
      INSERT INTO songs (title, artistName, genre, fileUrl, duration, song_photo_url)
      VALUES (?, ?, ?, ?, ?, ?)
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
    return await db.query('SELECT * FROM songs ORDER BY songId DESC');
  },

  getById: async (songId) => {
    const sql = 'SELECT * FROM songs WHERE songId = ?';
    const results = await db.query(sql, [songId]);
    return results[0];
  }
};

module.exports = SongModel;