import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tunely</Text>
      <FlatList
        data={[
          { id: "1", title: "Song 1" },
          { id: "2", title: "Song 2" },
          { id: "3", title: "Song 3" },
          { id: "4", title: "Song 4" },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.songCard}>
            <Text style={styles.songTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
