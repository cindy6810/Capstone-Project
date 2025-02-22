import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useAudio } from "../context/AudioContext";
import { Ionicons } from '@expo/vector-icons';

const defaultCoverImage = require('../assets/note.jpg');

const SongCard = ({ song }) => {
  const navigation = useNavigation();
  const { playSound, pauseSound, resumeSound, currentSong, isPlaying } = useAudio();

  const handlePress = async () => {
    if (currentSong?.songId === song.songId) {
      if (isPlaying) {
        await pauseSound();
      } else {
        await resumeSound();
      }
    } else {
      await playSound(song);
    }
    navigation.navigate("SongDetail", { song });
  };

  const isCurrentSong = currentSong?.songId === song.songId;

  return (
    <TouchableOpacity
      style={[styles.songCard, isCurrentSong && styles.activeSongCard]}
      onPress={handlePress}
    >
      <Image 
        source={song.song_photo_url ? { uri: song.song_photo_url } : defaultCoverImage}
        style={styles.songCardImage} 
      />
      <View style={styles.songCardInfo}>
        <Text style={styles.songCardTitle}>{song.title}</Text>
        <Text style={styles.songCardArtist}>{song.artistName}</Text>
        {isCurrentSong && (
          <Ionicons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={24} 
            color="#1DB954"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;