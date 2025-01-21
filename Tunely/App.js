import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import LibraryScreen from "./screens/Library";

const Tab = createBottomTabNavigator();

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
