import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

// Import screens
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import LibraryScreen from "./screens/Library";
import ProfileScreen from "./screens/Profile";
import LoginScreen from "./screens/Login"; // New Login Screen
import SignUpScreen from "./screens/SignUp"; // New Sign-Up Screen
import LoginFormPage from "./screens/LoginFormPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Tunely</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => alert("Profile Button Pressed")}
        >
          <Ionicons name="person-circle-outline" size={30} color="#E14594" />
        </TouchableOpacity>
      </View>

      {/* Bottom navigation */}
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
          tabBarActiveTintColor: "#E14594",
          tabBarInactiveTintColor: "#7045AF",
          tabBarStyle: { backgroundColor: "#182952" },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LoginFormPage" component={LoginFormPage} /> 
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
