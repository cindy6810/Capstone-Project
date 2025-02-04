import React from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import SongCard from "../components/SongCard";
import SongCard2 from "../components/SongCard2";
import NavButton from "../components/NavButton";


export default function HomeScreen() {

  const navigation = useNavigation();

  const songs = [
    { id: "1", title: "Song 1", artist: "Artist 1", image: require("../assets/graduation.jpg") },
    { id: "2", title: "Song 2", artist: "Artist 2", image: require("../assets/graduation.jpg") },
    { id: "3", title: "Song 3", artist: "Artist 3", image: require("../assets/graduation.jpg") },
    { id: "4", title: "Song 4", artist: "Artist 4", image: require("../assets/graduation.jpg") },
  ];
  
  return (
    <View style={styles.container}>
      <NavButton title="Playlists"/>
      <Text style={[styles.title, { marginBottom: 20 }]}>Welcome to Tunely</Text>
      <Text style={styles.subtitle}>New Music</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongCard song={item} />}
      />
      <Text style={styles.subtitle}>Featured Music</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => <SongCard2 song={item} />}
      />
    </View>
  );
}
