const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const songRoutes = require('./routes/songRoutes');
const userRoutes = require('./routes/userRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});