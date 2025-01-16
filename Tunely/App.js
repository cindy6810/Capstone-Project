import React from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore"; // If using Firestore
import { firebaseConfig } from "./firebaseConfig"; // Your Firebase Config

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Tab Navigator
const Tab = createBottomTabNavigator();

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
      <TextInput style={styles.searchBar} placeholder="Search songs, artists..." placeholderTextColor="#727D73" />
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

// Library Page
function LibraryScreen() {
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
