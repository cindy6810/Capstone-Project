import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert, Modal, TextInput, ScrollView } from "react-native";
import { styles } from "../styles";
import PlayList from "../components/Playlist";
import { Ionicons } from '@expo/vector-icons';

export default function UserPlayList() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]); // List of songs from the database
  const [modalVisible, setModalVisible] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  // Fetch playlists from backend
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://172.20.10.3:3000/api/playlists');
        const data = await response.json();
        
        if (response.ok) {
          setPlaylists(data);
        } else {
          Alert.alert('Error', 'Failed to load playlists');
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
        Alert.alert('Error', 'Failed to fetch playlists');
      }
    };

    fetchPlaylists();
  }, []);

  // Fetch songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://172.20.10.3:3000/api/playlists');
        const data = await response.json();
        
        if (response.ok) {
          setSongs(data);
        } else {
          Alert.alert('Error', 'Failed to load songs');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
        Alert.alert('Error', 'Failed to fetch songs');
      }
    };

    fetchSongs();
  }, []);

  // Toggle song selection
  const toggleSelectSong = (songId) => {
    setSelectedSongs((prevSelected) =>
      prevSelected.includes(songId)
        ? prevSelected.filter((id) => id !== songId)
        : [...prevSelected, songId]
    );
  };

  // Handle creating a new playlist
  const handleCreatePlaylist = async () => {
    setModalVisible(true);
  };

  const handleSubmitPlaylist = async () => {
    if (!playlistTitle.trim()) {
      Alert.alert("Error", "Playlist title cannot be empty");
      return;
    }

    try {
      const newPlaylist = {
        title: playlistTitle,
        songs: selectedSongs, // Send selected song IDs
      };

      const response = await fetch('http://172.20.10.3:3000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaylist),
      });

      const data = await response.json();

      if (response.ok) {
        setPlaylists((prevPlaylists) => [
          ...prevPlaylists,
          { id: data.id, title: playlistTitle, image: require("../assets/graduation.jpg") },
        ]);
        Alert.alert('Success', 'New playlist created!');
        setModalVisible(false);
        setPlaylistTitle("");
        setSelectedSongs([]);
      } else {
        Alert.alert('Error', 'Failed to create playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      Alert.alert('Error', 'Failed to create playlist');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayList
            title={item.title}
            playlistId={item.id}
            image={item.image}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.fabButton}
        onPress={handleCreatePlaylist}
      >
        <Ionicons name="add" size={24} color="black" />
        <Text style={styles.fabButtonText}>New</Text>
      </TouchableOpacity>

      {/* Modal for creating playlist */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter playlist title"
              value={playlistTitle}
              onChangeText={setPlaylistTitle}
            />
            
            <Text style={styles.modalSubtitle}>Select Songs</Text>
            <ScrollView>
              {songs.map((song) => (
                <TouchableOpacity
                  key={song.id}
                  style={[styles.songItem, selectedSongs.includes(song.id) && styles.songItemSelected]}
                  onPress={() => toggleSelectSong(song.id)}
                >
                  <Text style={styles.songTitle}>{song.title} - {song.artist}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.createButton} onPress={handleSubmitPlaylist}>
              <Text style={styles.createButtonText}>Create Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
