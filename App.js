import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import screens
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import LibraryScreen from "./screens/Library";
import ProfileScreen from "./screens/Profile";
import LoginScreen from "./screens/Login"; 
import SignUpScreen from "./screens/SignUp"; 
import LoginFormPage from "./screens/LoginFormPage";
import SongDetailScreen from "./screens/SongDetail";


import SettingsScreen from "./screens/Settings";
import SignUpPage from "./screens/SignUp";
 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
 
function TabNavigator({ navigation }) {
  return (
    <>
      {/* Top Bar with Profile Button */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Tunely</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={30} color="#f1f1f1" />
        </TouchableOpacity>
      </View>
 
      {/* Bottom Navigation */}
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
          tabBarActiveTintColor: "#f1f1f1",
          tabBarInactiveTintColor: "#666",
          tabBarStyle: styles.tabBarStyle,
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
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />        
        <Stack.Screen name="SongDetail" component={SongDetailScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="LoginFormPage" component={LoginFormPage} /> 
        <Stack.Screen name="SignUp" component={SignUpPage} /> 

      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
 