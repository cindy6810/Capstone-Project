import React from "react";
import { TextInput, View, FlatList, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";
import SongCard from "../components/SongCard";



export default function SearchScreen() {

  const searchResults = [
    { id: "1", title: "Search Result 1", artist: "Artist 1", image: require("../assets/note.jpg") },
    { id: "2", title: "Search Result 2", artist: "Artist 2", image: require("../assets/note.jpg") },
  ];
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search song, artist, album..."
        placeholderTextColor="#E14594"
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongCard song={item} />}
      />
      </View>
  );
}
