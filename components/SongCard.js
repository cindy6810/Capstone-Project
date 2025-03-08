import React from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useAudio } from "../context/AudioContext";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

const defaultCoverImage = require('../assets/note.jpg');

const SongCard = ({ song, isCurrentSong, playlistId, showOptions, onRemove  }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
  };

  const handleRemoveSong = () => {
    setModalVisible(true);
  };

  const confirmRemove = async () => {
    if (!song.id) {
      console.error("Song ID is undefined");
      return;
    }

    console.log("Confirmed removal of song:", song.id);  // Ensure song.id is being accessed correctly
    await onRemove(playlistId, song.id);  // Call the remove function passed from parent
    setModalVisible(false);  // Close the modal
  };


  return (
    <View>

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
        {isCurrentSong }
      </View>
      {/* Three-dot menu */}
      {showOptions && (
        <TouchableOpacity onPress={handleRemoveSong} style={styles.optionsIcon}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>

    {/* Modal for confirming song removal */}
    <Modal transparent={true} visible={modalVisible} animationType="fade">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          Remove "{song.title}" from playlist?
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmRemove} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
      </View>
  );
};

export default SongCard;