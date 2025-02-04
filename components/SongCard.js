import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";

const SongCard = ({ song }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.songCard}
      onPress={() => navigation.navigate("SongDetail", { song })}
    >
      <Image source={song.image} style={styles.songCardImage} />
      <View style={styles.songCardInfo}>
        <Text style={styles.songCardTitle}>{song.title}</Text>
        <Text style={styles.songCardArtist}>{song.artist}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;