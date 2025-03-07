import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SongCard from "../components/SongCard";
import { SafeAreaView } from 'react-native';
import { styles as globalStyles } from "../styles";
import { LinearGradient } from 'expo-linear-gradient';

const defaultCoverImage = require('../assets/note.jpg');

const PlaylistDetail = () => {
  const route = useRoute();
  const { playlistId, title, image, songs: playlistSongs = [] } = route.params;

  // Use songs from params if available, otherwise use dummy songs
  const songs = playlistSongs.length > 0 ? playlistSongs : [
    { id: "1", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "2", title: "Song 2", artist: "Artist 2", image: require("../assets/graduation.jpg") },
    { id: "3", title: "Song 3", artist: "Artist 3", image: require("../assets/graduation.jpg") },
    { id: "4", title: "Song 4", artist: "Artist 4", image: require("../assets/note.jpg") },
  ];
  
  const getSongCovers = () => {
    const songCovers = [];
    
    if (songs && songs.length > 0) {
      for (let i = 0; i < Math.min(songs.length, 4); i++) {
        if (songs[i]?.song_photo_url) {
          songCovers.push({ uri: songs[i].song_photo_url });
        } else if (songs[i]?.image) {
          songCovers.push(songs[i].image);
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

  const handleAddSong = () => {
    // Handle adding songs to playlist
  };

  const renderHeader = () => (
    <>
      {/* Replace single image with grid layout */}
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
          data={songs}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SongCard song={item} />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
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
});

export default PlaylistDetail;