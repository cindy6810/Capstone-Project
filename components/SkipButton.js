import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";

export default function SkipButton({ direction, onPress }) {
  const iconName = direction === "forward" ? "play-skip-forward" : "play-skip-back";

  return (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <Ionicons name={iconName} size={30} color="#fff" />
    </TouchableOpacity>
  );
}