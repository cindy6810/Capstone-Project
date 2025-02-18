import React from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import SongCard from "../components/SongCard";
import NavButton from "../components/PlayListButton";

export default function LibraryScreen() {
  const navigation = useNavigation();
    const route = useRoute();
    const isActive = route.name === 'UserPlayList';
  
    const handlePlaylistsPress = () => {
      if (isActive) {
        navigation.goBack();
      } else {
        navigation.navigate('UserPlayList');
      }
    };

  const songs = [
    { id: "1", title: "Liked Song 1", artist: "Artist 1", image: require("../assets/note.jpg") },
    { id: "2", title: "Liked Song 2", artist: "Artist 2", image: require("../assets/note.jpg") },
  ];


  return (
    <View style={styles.container}>
      <NavButton 
        title="Playlists" 
        onPress={handlePlaylistsPress}
        style={[
          libraryStyles.button,
          isActive && libraryStyles.activeButton
        ]}
        textStyle={[
          libraryStyles.buttonText,
          isActive && libraryStyles.activeButtonText
        ]}
      />
      <Text style={styles.title}>Your Library</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongCard song={item} />}
      />
    </View>
  );
}

// Styles
const libraryStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(42, 42, 42, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  activeButton: {
    backgroundColor: "#1DB954",
  },
  buttonText: {
    color: "#f1f1f1",
    fontSize: 16,
    fontWeight: "600",
  },
  activeButtonText: {
    color: "#fff",
  }
});
