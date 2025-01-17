import React from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from "./firebase"; // Import your firebase configuration

// Tab Navigator
const Tab = createBottomTabNavigator();

// Save Data to AsyncStorage
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Load Data from AsyncStorage
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

// Home Page
function HomeScreen() {
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

// Search Page
function SearchScreen() {
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

// Library Page with AsyncStorage integration
function LibraryScreen() {
  const saveLikedSongs = async () => {
    const likedSongs = [
      { id: "1", title: "Liked Song 1" },
      { id: "2", title: "Liked Song 2" },
    ];
    await storeData("likedSongs", likedSongs);
  };

  const loadLikedSongs = async () => {
    const songs = await getData("likedSongs");
    console.log("Loaded Liked Songs:", songs);
  };

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
      <TouchableOpacity onPress={saveLikedSongs} style={styles.songCard}>
        <Text style={styles.songTitle}>Save Liked Songs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={loadLikedSongs} style={styles.songCard}>
        <Text style={styles.songTitle}>Load Liked Songs</Text>
      </TouchableOpacity>
    </View>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Library") {
              iconName = focused ? "library" : "library-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#727D73",
          tabBarInactiveTintColor: "#D0DDD0",
          headerStyle: { backgroundColor: "#AAB99A" },
          headerTitleStyle: { color: "#F0F0D7" },
          tabBarStyle: { backgroundColor: "#AAB99A" },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
