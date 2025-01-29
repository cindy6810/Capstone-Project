import React from "react";
import { Button, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { styles } from "../styles";

export default function PlayPauseButton({ onPress }) {
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePress = () => {
      setIsPlaying(!isPlaying);
      onPress();
    };
  
    return (
      <TouchableOpacity onPress={handlePress} style={styles.iconButton}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={30} color="#fff" />
      </TouchableOpacity>
    );
  }