import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tunely</Text>
      <FlatList
        data={[
          { id: "1", title: "Song 1" },
          { id: "2", title: "Song 2" },
          { id: "3", title: "Song 3" },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0D7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#727D73",
    marginBottom: 20,
  },
  songCard: {
    backgroundColor: "#AAB99A",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  songTitle: {
    color: "#F0F0D7",
    fontWeight: "bold",
  },
});
