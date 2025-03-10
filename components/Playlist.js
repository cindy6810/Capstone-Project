import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "../styles"; // Import styles from the shared styles file

const PlayList = ({ title, playlistId, image }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("PlaylistDetail", {
      playlistId,
      title,
      image
    });
  }

  

  return (
    <TouchableOpacity style={styles.songCard} onPress={handlePress}>
      <Image source={image} style={styles.songCardImage} />
      <View style={styles.songCardInfo}>
        <Text style={styles.songCardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlayList;