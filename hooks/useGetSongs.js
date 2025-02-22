import { useState, useEffect } from 'react';
import { songService } from '../services/songService';

export const useGetSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await songService.getAllSongs();
      setSongs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching songs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const refreshSongs = () => {
    fetchSongs();
  };

  return {
    songs,
    loading,
    error,
    refreshSongs
  };
};