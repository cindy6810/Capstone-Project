import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { auth, storage, database } from "../firebase"; // Assuming Firebase is configured

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const userRef = database.ref(`users/${userId}`);
        const snapshot = await userRef.once("value");

        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsername(data.username || "User");
          setProfilePic(data.profilePic || null); // Use default if no picture is set
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
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const userId = auth.currentUser.uid;
        const storageRef = storage.ref().child(`profilePictures/${userId}`);
        await storageRef.put(blob);
        const downloadURL = await storageRef.getDownloadURL();

        // Update in the database
        const userRef = database.ref(`users/${userId}`);
        await userRef.update({ profilePic: downloadURL });

        setProfilePic(downloadURL); // Update locally
      } catch (error) {
        console.error("Error uploading profile picture:", error);
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
