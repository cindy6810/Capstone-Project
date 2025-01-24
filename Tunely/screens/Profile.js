import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase"; // Adjust import to your Firebase config
import { getUserData, updateUserData, uploadProfilePicture } from "../firebase"; // Import relevant functions

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const userData = await getUserData(userId);

        if (userData) {
          setUsername(userData.username || "User");
          setProfilePic(userData.profilePic || null); // Use default if no picture is set
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle profile picture change
  const changeProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f1f1f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => navigation.goBack()}>
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
          marginBottom: 20,
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

      {/* Additional Buttons */}
      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.songTitle}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
