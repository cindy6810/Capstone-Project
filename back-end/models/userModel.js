const db = require('../db');

const UserModel = {
  create: async (userData) => {
    const sql = `
    INSERT INTO users (id, username, email, profile_pic_url)
        VALUES (?, ?, ?, ?) 
        `;
    const params = [
      userData.id,
      userData.username,
      userData.email,
      userData.profile_pic_url
    ];
    return await db.query(sql, params);
},

addLikedSong: async (userId, songId) => {
  const sql = `
    INSERT INTO song_likes (user_id, song_id)
    VALUES (?, ?)
  `;
  return db.query(sql, [userId, songId]);
},

removeLikedSong: async (userId, songId) => {
  const sql = `
    DELETE FROM song_likes
    WHERE user_id = ? AND song_id = ?
  `;
  return db.query(sql, [userId, songId]);
},

toggleLikeSong: async (userId, songId) => {
  // First check if song is already liked
  const checkSql = 'SELECT * FROM song_likes WHERE user_id = ? AND song_id = ?';
  const results = await db.query(checkSql, [userId, songId]);
  
  if (results.length > 0) {
    await UserModel.removeLikedSong(userId, songId);
    return { action: 'unliked' };
  } else {
    // Like the song
    await UserModel.addLikedSong(userId, songId);
    return { action: 'liked' };
  }
},

    getById: async (id) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const results = await db.query(sql, [id]);
        return results[0];
    },

    getLikedSongs: async (userId) => {
        const sql = `
          SELECT s.* FROM songs s
          JOIN song_likes ul ON s.songId = ul.song_id
          WHERE ul.user_id = ?
        `;
        return db.query(sql, [userId]);
      }


      
};

module.exports = UserModel;