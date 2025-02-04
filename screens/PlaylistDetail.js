import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SongCard from "../components/SongCard";
import { SafeAreaView } from 'react-native';


const PlaylistDetail = () => {
  const route = useRoute();
  const { playlistId, title, image } = route.params;

  const songs = [
    { id: "1", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "2", title: "Song 2", artist: "Artist 2", image: require("../assets/graduation.jpg") },
    { id: "3", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "4", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "5", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "6", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "7", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "8", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "9", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "10 ", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "11", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "12", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
  ];

  const handleAddSong = () => {
    // Handle adding songs to playlist
  };

  const renderHeader = () => (
    <>
      <Image source={image} style={styles.artwork} />
      <View style={styles.headerContainer}>
        <Text style={styles.playlistTitle}>{title}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddSong}>
          <Ionicons name="add-circle-outline" size={24} color="#f1f1f1" />
          <Text style={styles.addButtonText}>Add Songs</Text>
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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  artwork: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
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
    backgroundColor: "#1a1a1a",
  },
});

export default PlaylistDetail;