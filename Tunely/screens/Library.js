import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Library</Text>
      <FlatList
        data={[
          { id: "1", title: "Liked Song 1" },
          { id: "2", title: "Liked Song 2" },
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

