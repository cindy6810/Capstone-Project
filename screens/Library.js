import React from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../styles";
import SongCard from "../components/SongCard";
import NavButton from "../components/NavButton";

export default function LibraryScreen() {

  const songs = [
    { id: "1", title: "Liked Song 1", artist: "Artist 1", image: require("../assets/note.jpg") },
    { id: "2", title: "Liked Song 2", artist: "Artist 2", image: require("../assets/note.jpg") },
  ];

  return (
    <View style={styles.container}>
      <NavButton title="Playlists"/>

      <Text style={styles.title}>Your Library</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongCard song={item} />}
      />
    </View>
  );
}

