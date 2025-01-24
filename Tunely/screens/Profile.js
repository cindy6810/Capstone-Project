import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from "react-native";
import { styles } from "../styles";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
    </View>
  );
}


