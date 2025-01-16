import React from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tunely</Text>
      </View>

      <TextInput 
        style={styles.searchBar} 
        placeholder="Search for songs, artists, albums..." 
        placeholderTextColor="#888" 
      />

      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Playlists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Chill Vibes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Top Hits</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Workout Jams</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Oldies but Goldies</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Now</Text>
          <View>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Song 1 - Artist 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Song 2 - Artist 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Song 3 - Artist 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Song 4 - Artist 4</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    paddingTop: 40,
  },
  header: {
    backgroundColor: "#1db954",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchBar: {
    margin: 20,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#282828",
    color: "#fff",
  },
  mainContent: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#282828",
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  cardText: {
    color: "#fff",
    textAlign: "center",
  },
});
