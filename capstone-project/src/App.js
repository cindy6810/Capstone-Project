import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Tunely</h1>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#library">Library</a></li>
            <li><a href="#premium">Premium</a></li>
          </ul>
        </nav>
      </header>

      <div className="search-section">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search for songs, artists, albums..." 
        />
      </div>

      <main className="main-content">
        <section className="featured-playlists">
          <h2>Featured Playlists</h2>
          <div className="playlists">
            <div className="playlist-card">Chill Vibes</div>
            <div className="playlist-card">Top Hits</div>
            <div className="playlist-card">Workout Jams</div>
            <div className="playlist-card">Oldies but Goldies</div>
          </div>
        </section>

        <section className="popular-songs">
          <h2>Popular Now</h2>
          <div className="song-list">
            <div className="song-card">Song 1 - Artist 1</div>
            <div className="song-card">Song 2 - Artist 2</div>
            <div className="song-card">Song 3 - Artist 3</div>
            <div className="song-card">Song 4 - Artist 4</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
