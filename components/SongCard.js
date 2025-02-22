import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";

const defaultCoverImage = require('../assets/note.jpg');

const SongCard = ({ song }) => {
  const navigation = useNavigation();


  return (
    <TouchableOpacity
      style={styles.songCard}
      onPress={() => navigation.navigate("SongDetail", { song })}
    >
      <Image 
        source={
          song.song_photo_url 
            ? { uri: song.song_photo_url }
            : defaultCoverImage
        }
        style={styles.songCardImage} 
      />
      <View style={styles.songCardInfo}>
        <Text style={styles.songCardTitle}>{song.title}</Text>
        <Text style={styles.songCardArtist}>{song.artistName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;