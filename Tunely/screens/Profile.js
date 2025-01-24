import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../Utility/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  getUserData,
  updateUserData,
  uploadProfilePicture,
} from "../Utility/firebaseConfig";

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Request media library permissions
    const requestPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need permission to access your photos."
        );
      }
    };

    // Fetch user data
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const userData = await getUserData(userId);

          if (userData) {
            setUsername(userData.username || "User");
            setProfilePic(userData.profilePic || null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          Alert.alert("Error", "Failed to load user data.");
        }
      } else {
        navigation.replace("Login");
      }
    };

    requestPermissions();
    fetchUserData();
  }, [navigation]);

  // Change profile picture
  const changeProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const userId = auth.currentUser.uid;
        const downloadURL = await uploadProfilePicture(userId, result.uri);
        await updateUserData(userId, { profilePic: downloadURL });
        setProfilePic(downloadURL);
      } else {
        Alert.alert("No Image Selected", "You didn't select an image.");
      }
    } catch (error) {
      console.error("Error changing profile picture:", error);
      Alert.alert("Error", "Failed to update profile picture.");
    }
  };

  // Logout user
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.replace("Login");
            } catch (error) {
              console.error("Error signing out:", error);
              Alert.alert(
                "Logout Error",
                "There was an issue logging out. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginBottom: 80, top: 50 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#f1f1f1" />
      </TouchableOpacity>

      <Image
        source={{
          uri: profilePic || "https://via.placeholder.com/150",
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 2,
          borderColor: "#f1f1f1",
          marginBottom: 50,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
        onPress={changeProfilePicture}
      >
        <Text style={styles.songTitle}>Change Profile Picture</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{username}</Text>

      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.songTitle}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={handleLogout}
      >
        <Text style={styles.songTitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
