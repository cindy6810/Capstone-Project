import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";

const SongCard2 = ({ song }) => {
  const navigation = useNavigation();
  const defaultCoverImage = require('../assets/note.jpg');

  return (
    <TouchableOpacity
      style={styles.songCard2}
      onPress={() => navigation.navigate("SongDetail", { song })}
    >
      <ImageBackground 
        source={song.song_photo_url ? { uri: song.song_photo_url } : defaultCoverImage}
        style={styles.songCard2Image}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.songCard2TitleContainer}>
          <Text style={styles.songCard2Title}>{song.title}</Text>
          <Text style={styles.songCard2Artist}>{song.artistName}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SongCard2;