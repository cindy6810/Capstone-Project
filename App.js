import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AudioProvider } from "./context/AudioContext";
import { Audio } from "expo-av";

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
import UploadScreen from "./screens/Upload";
import PlaylistDetail from "./screens/PlaylistDetail";
import UserPlayList from "./screens/UserPlayList";
import PlayListButton from "./components/PlayListButton";
import CommentScreen from "./screens/CommentScreen";
import TopBarProfileIcon from "./components/TopBarProfileIcon";
import FloatingPlayer from "./components/FloatingPlayer";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Reusable top bar component
function ScreenWithTopBar({ navigation, children, title }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <TopBarProfileIcon size={30} />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

function HomeWithTopBar({ navigation }) {
  return (
    <ScreenWithTopBar navigation={navigation} title="Tunely">
      <HomeScreen />
    </ScreenWithTopBar>
  );
}

function SearchWithTopBar({ navigation }) {
  return (
    <ScreenWithTopBar navigation={navigation} title="Search">
      <SearchScreen />
    </ScreenWithTopBar>
  );
}

function UserPlayListWithTopBar({ navigation }) {
  return (
    <ScreenWithTopBar navigation={navigation} title="Playlists">
      <View style={styles.container}>
        <PlayListButton title="Playlists" />
        <UserPlayList />
      </View>
    </ScreenWithTopBar>
  );
}

//stack for home screen
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeWithTopBar} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
    </Stack.Navigator>
  );
}

//stack for library screen
function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen
        name="UserPlayList"
        component={UserPlayListWithTopBar}
        options={{
          presentation: "card",
          animationEnabled: true,
        }}
      />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
    </Stack.Navigator>
  );
}

// Bottom tab navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={90}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
            }}
          />
        ),
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
        tabBarStyle: {
          ...styles.tabBarStyle,
          backgroundColor: "transparent",
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          height: 70,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchWithTopBar} />
      <Tab.Screen name="Library" component={LibraryStack} />
    </Tab.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <AudioProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={TabNavigator} />
              <Stack.Screen
                name="SongDetail"
                component={SongDetailScreen}
                options={{
                  presentation: "transparentModal",
                }}
              />
              <Stack.Screen
                name="CommentScreen"
                component={CommentScreen}
                options={{
                  presentation: "transparentModal",
                  headerShown: false,
                  animation: "default",
                  cardOverlayEnabled: true,
                  animationEnabled: true,
                  cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                      opacity: progress,
                    },
                    overlayStyle: {
                      opacity: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.5],
                      }),
                    },
                  }),
                }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="LoginFormPage" component={LoginFormPage} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Upload" component={UploadScreen} />
            </Stack.Navigator>
            <FloatingPlayer />
          </View>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AudioProvider>
  );
}
