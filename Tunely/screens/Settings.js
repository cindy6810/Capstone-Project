import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage'; // For saving image URL locally

export default function SettingsPage() {
  const [profilePicture, setProfilePicture] = useState(null);

  const pickImage = async () => {
    // Request media library permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.uri);
      await AsyncStorage.setItem("profilePicture", result.uri); // Save the profile picture URL
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Display the current profile picture */}
      <Image
        source={{ uri: profilePicture || "https://via.placeholder.com/100" }}
        style={settingsStyles.profilePicture}
      />

      {/* Button to select a new profile picture */}
      <TouchableOpacity style={settingsStyles.button} onPress={pickImage}>
        <Text style={settingsStyles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );
}

const settingsStyles = StyleSheet.create({
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  button: {
    backgroundColor: "#2B3595",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
