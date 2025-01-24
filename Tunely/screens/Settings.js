import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Settings Buttons */}
      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
      >
        <Text style={styles.songTitle}>Change Profile Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
      >
        <Text style={styles.songTitle}>Update Info</Text>
      </TouchableOpacity>
    </View>
  );
}
