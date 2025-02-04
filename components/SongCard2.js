import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";

const SongCard2 = ({ song }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.songCard2}
      onPress={() => navigation.navigate("SongDetail", { song })}
    >
      <ImageBackground source={song.image} style={styles.songCard2Image}>
        <View style={styles.songCard2TitleContainer}>
          <Text style={styles.songCard2Title}>{song.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SongCard2;