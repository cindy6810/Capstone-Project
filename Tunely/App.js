import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

// Import screens
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import LibraryScreen from "./screens/Library";
import ProfileScreen from "./screens/Profile";

const Tab = createBottomTabNavigator();

function CustomTopBar({ navigation }) {
  return (
    <View style={styles.topBar}>
      {/* <Text style={styles.title}>Tunely</Text> */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack(); 
          } else {
            navigation.navigate('Profile');  
          }
        }}
      >
        <Ionicons name="pesarson-circle-outline" size={30} color="#E14594" />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={({ navigation, route }) => ({
    header: () => <CustomTopBar navigation={navigation} />,
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
    headerShown: true, 
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Search" component={SearchScreen} />
  <Tab.Screen name="Library" component={LibraryScreen} />

  {/* Add the Profile screen but hide it from the tab bar */}
  <Tab.Screen 
  name="Profile" 
  component={ProfileScreen} 
  options={{ 
    tabBarButton: () => null, 
    tabBarItemStyle: { display: 'none' },
    headerShown: false
  }} 
/>

</Tab.Navigator>

    </NavigationContainer>
  );
}
