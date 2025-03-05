import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [playlistSource, setPlaylistSource] = useState('all');

  const changePlaylist = (songs, source) => {
    setPlaylist(songs);
    setPlaylistSource(source);
  };

  const playNextSong = async () => {
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(song => song.songId === currentSong.songId);
    if (currentIndex === -1 || currentIndex === playlist.length - 1) return;
    
    const nextSong = playlist[currentIndex + 1];
    await playSound(nextSong);
  };

  const playPreviousSong = async () => {
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(song => song.songId === currentSong.songId);
    if (currentIndex === -1 || currentIndex === 0) return;
    
    const previousSong = playlist[currentIndex - 1];
    await playSound(previousSong);
  };

  const playSound = async (song) => {
    try {
      if (currentSong?.songId === song.songId && sound) {
        if (isPlaying) {
          await pauseSound();
          return;
        } else {
          await resumeSound();
          return;
        }
      }
      // Unload previous sound if exists
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.fileUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const pauseSound = async () => {
    try {
      if (sound) {
        await sound.setStatusAsync({ shouldPlay: false });
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  };

  const resumeSound = async () => {
    try {
      if (sound) {
        await sound.setStatusAsync({ shouldPlay: true });
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error resuming sound:', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsPlaying(false);
        playNextSong(); // Auto-play next song
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <AudioContext.Provider 
      value={{ 
        sound,
        currentSong,
        isPlaying,
        playlist,
        playlistSource,
        playSound,
        pauseSound,
        resumeSound,
        playNextSong,
        playPreviousSong,
        changePlaylist
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);