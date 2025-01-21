import React from "react";
import { StyleSheet, TextInput, View, FlatList, TouchableOpacity, Text } from "react-native";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search songs, artists..."
        placeholderTextColor="#727D73"
      />
      <FlatList
        data={[
          { id: "1", title: "Search Result 1" },
          { id: "2", title: "Search Result 2" },
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
  searchBar: {
    backgroundColor: "#D0DDD0",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    color: "#727D73",
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
