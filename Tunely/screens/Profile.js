import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles"; // Assuming you already have a styles file

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleSettingsNavigation = () => {
    navigation.navigate("Settings"); // Navigates to the Settings page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      
      {/* Profile Picture */}
      <Image
        source={{ uri: "https://via.placeholder.com/100" }} // Replace with user's profile picture URL
        style={profileStyles.profilePicture}
      />
      
      {/* Buttons for Settings, Upload, and More Info */}
      <TouchableOpacity style={profileStyles.button} onPress={handleSettingsNavigation}>
        <Text style={profileStyles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={profileStyles.button}>
        <Text style={profileStyles.buttonText}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={profileStyles.button}>
        <Text style={profileStyles.buttonText}>More Info</Text>
      </TouchableOpacity>
    </View>
  );
}

const profileStyles = StyleSheet.create({
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
