import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import { styles } from "../styles";
import PlayList from "../components/Playlist";
import { Ionicons } from '@expo/vector-icons';

export default function UserPlayList() {
  const playlists = [
    { id: "1", title: "My Playlist 1", image: require("../assets/graduation.jpg") },
    { id: "2", title: "My Playlist 2", image: require("../assets/graduation.jpg") },
    { id: "3", title: "My Playlist 3", image: require("../assets/graduation.jpg") },
    { id: "4", title: "My Playlist 4", image: require("../assets/graduation.jpg") },
  ];

  const handleCreatePlaylist = () => {
    // Handle new playlist creation
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
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
    </SafeAreaView>
  );
}