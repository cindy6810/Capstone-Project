import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../Utility/firebaseConfig";
import { signOut } from "firebase/auth";
import { getUserData, updateUserData, uploadProfilePicture } from "../Utility/firebaseConfig";

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Request permissions for image picker
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "We need permission to access your photos.");
      }
    };

    requestPermissions();

    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const userData = await getUserData(userId);

          if (userData) {
            setUsername(userData.username || "User");
            setProfilePic(userData.profilePic || null); // Use default if no picture is set
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // If no user is logged in, navigate to Login screen
        navigation.replace("Login");
      }
    };

    fetchUserData();
  }, [navigation]);

  // Handle profile picture change
  const changeProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensure media type is set to images only
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      try {
        const userId = auth.currentUser.uid;
        const downloadURL = await uploadProfilePicture(userId, result.uri);

        // Update profile picture URL in Firebase
        await updateUserData(userId, { profilePic: downloadURL });

        setProfilePic(downloadURL); // Update locally
      } catch (error) {
        console.error("Error changing profile picture:", error);
      }
    } else {
      Alert.alert("No image selected", "You didn't select an image.");
    }
  };

  // Handle sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login"); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={{ marginBottom: 80, top: 50 }} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#f1f1f1" />
      </TouchableOpacity>

      {/* Profile Picture */}
      <Image
        source={{
          uri: profilePic || "https://via.placeholder.com/150", // Default picture
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 2,
          borderColor: "#f1f1f1",
          marginBottom: 50,
          marginLeft: 140,
        }}
      />

      {/* Change Profile Picture Button */}
      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
        onPress={changeProfilePicture}
      >
        <Text style={styles.songTitle}>Change Profile Picture</Text>
      </TouchableOpacity>

      {/* Username */}
      <Text style={styles.title}>{username}</Text>

      {/* Settings Button */}
      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.songTitle}>Settings</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
          marginTop: 20, // Added spacing between buttons
        }}
        onPress={handleLogout}
      >
        <Text style={styles.songTitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

