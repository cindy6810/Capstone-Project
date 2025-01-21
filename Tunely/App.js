import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import LibraryScreen from "./screens/Library";
import ProfileScreen from "./screens/Profile";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.topBar}>
        <Text style={styles.title}>Tunely</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => alert("Profile Button Pressed")}
        >
          <Ionicons name="person-circle-outline" size={30} color="#F0F0D7" />
        </TouchableOpacity>
      </View>

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
          tabBarStyle: { backgroundColor: "#AAB99A" },
          headerShown: false, // Disable individual screen headers
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#AAB99A",
    padding: 10,
    paddingTop: 40, // Adjust for safe area
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F0F0D7",
  },
  profileButton: {
    padding: 5,
  },
});
