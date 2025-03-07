import React, { useState, useEffect } from "react";
import { API_URL } from '../config/apiConfig';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import SongCard from "../components/SongCard";
import { SafeAreaView } from 'react-native';
import { styles as globalStyles } from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { auth } from '../Utility/firebaseConfig';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return {};
  
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

const defaultCoverImage = require('../assets/note.jpg');

const PlaylistDetail = () => {
  const route = useRoute();
  const { playlistId, title, image } = route.params;
  const [userSongs, setUserSongs] = useState();
  const [availableSongs, setAvailableSongs] = useState([]);

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  
  // Fetch playlist with its songs
  useEffect(() => {
    setUserSongs([]);
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`${API_URL}/playlists/${playlistId}`);
        const data = await response.json();
        if (response.ok) {
          setUserSongs(data.songs); // Set the songs from the fetched playlist
        } else {
          console.log('Could not fetch playlist');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const getSongCovers = () => {
    const songCovers = [];
    
    if (userSongs && userSongs.length > 0) {
      for (let i = 0; i < Math.min(userSongs.length, 4); i++) {
        if (userSongs[i]?.song_photo_url) {
          songCovers.push({ uri: userSongs[i].song_photo_url });
        } else if (userSongs[i]?.image) {
          songCovers.push(userSongs[i].image);
        } else {
          songCovers.push(defaultCoverImage);
        }
      }
    }
    
    while (songCovers.length < 4) {
      songCovers.push(defaultCoverImage);
    }
    
    return songCovers;
  };

  const songCovers = getSongCovers();

  // Add songs to the playlist

  const handleAddSong = async () => {
    try {
      
      const response = await fetch(`${API_URL}/songs`);
      const data = await response.json();
      if (response.ok) {
        console.log("Available Songs: ", data);
        // Show the modal to select songs, instead of immediately adding them
        setAvailableSongs(data);
        setModalVisible(true); // Show modal after fetching songs
      } else {
        console.log("Could not fetch songs");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAddToPlaylist = async (song) => {
    try {

      console.log("Song object:", song); // Debugging

      if (!song || song.songId === undefined || song.songId === null) {
        console.error("Invalid song object:", song);
        return; // exit if song is invalid
      }

      const headers = await getAuthHeaders(); // Get the headers, including the Authorization token
      const requestBody = {
        songIds: [song.songId], // Ensure it's an array
      };
      const response = await fetch(`${API_URL}/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: {
          ...headers, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),

      });
      
      console.log("Sending request with body:", requestBody);

      if (response.ok) {
        console.log(`Song added to playlist: ${song.title}`);
        setUserSongs((prevSongs) => [...prevSongs, song]); // Update the UI by adding the song
        setModalVisible(false); // Close the modal after adding
      } else {
        console.log('Failed to add song');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const renderHeader = () => (
    <>
      <View style={styles.artworkContainer}>
        <View style={styles.artworkRow}>
          <Image source={songCovers[0]} style={styles.artworkQuadrant} />
          <Image source={songCovers[1]} style={styles.artworkQuadrant} />
        </View>
        <View style={styles.artworkRow}>
          <Image source={songCovers[2]} style={styles.artworkQuadrant} />
          <Image source={songCovers[3]} style={styles.artworkQuadrant} />
        </View>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.playlistTitle}>{title}</Text>
        <TouchableOpacity onPress={handleAddSong}>
          <LinearGradient
            colors={['#111', '#333']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={24} color="#f1f1f1" />
            <Text style={styles.addButtonText}>Add Songs</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={userSongs}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item, index) => item.id?.toString() || `playlist-song-${index}`}
          renderItem={({ item }) => <SongCard song={item} />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>

      {/* Modal for adding songs */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Songs to Add</Text>
            <FlatList
              data={availableSongs}
              keyExtractor={(item, index) => item.id?.toString() || `modal-song-${index}`}
              renderItem={({ item }) => (
                <View style={styles.songItem}>
                  <Text style={styles.songTitle}>{item.title} - {item.artist}</Text>
                  <TouchableOpacity onPress={() => handleAddToPlaylist(item)}>
                    <Ionicons name="add-circle" size={24} color="#28a745" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(4,4,4)",
  },
  artworkContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    overflow: 'hidden',
  },
  artworkRow: {
    flexDirection: 'row',
    height: '50%',
  },
  artworkQuadrant: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f1f1",
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#f1f1f1",
    marginLeft: 5,
  },
  contentContainer: {
    paddingTop: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgb(4, 4, 4)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgb(4,4,4)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f1f1',
    marginBottom: 15,
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  songTitle: {
    color: '#f1f1f1',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#f1f1f1',
    fontSize: 16,
  },
});

export default PlaylistDetail;
