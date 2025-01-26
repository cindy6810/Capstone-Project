import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginBottom: 80 , top: 50 }} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#f1f1f1" />
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
      >
        <Text style={styles.songTitle}>Privacy Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.songCard,
          alignItems: "center",
        }}
      >
        <Text style={styles.songTitle}>Notifications</Text>
      </TouchableOpacity>
    </View>
  );
}
