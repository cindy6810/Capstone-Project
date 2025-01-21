import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import LibraryScreen from "./screens/Library";
import ProfileScreen from "./screens/Profile";

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Stack Navigator to include top bar
const Stack = createStackNavigator();

// Custom Header with Profile Button
function CustomHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Tunely</Text>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-circle-outline" size={32} color="#727D73" />
      </TouchableOpacity>
    </View>
  );
}

// Main Tab Navigator with screens
function TabNavigator() {
  return (
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}

// Main App with Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Main App with Custom Header */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />,
          })}
        />
        {/* Profile Screen */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerStyle: { backgroundColor: "#AAB99A" },
            headerTitleStyle: { color: "#F0F0D7" },
            headerTintColor: "#F0F0D7",
            title: "Profile",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for the custom header
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#AAB99A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    color: "#F0F0D7",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 5,
  },
});
