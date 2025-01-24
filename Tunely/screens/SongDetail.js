import React from "react";
import { View, Text, Image, Button } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useState } from "react";

import Scrubber from "../components/Scrubber";
import PlayPauseButton from "../components/PlayPauseButton";
import SkipButton from "../components/SkipButton";

export default function SongDetailScreen({ route }) {
  const { song } = route.params;
  const navigation = useNavigation();
  const [sliderValue, setSliderValue] = useState(0);


  //used to swipe down to go back
  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationY > 100) {
      navigation.goBack();
    }
  };
  

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
    <View style={styles.songDetailsContainer}>
    <View style={styles.imageTitleContainer}>
      <Image source={song.image} style={styles.songImage} />
      <Text style={styles.songTitle}>{song.title}</Text>
    </View>
    <Scrubber />
    <View style={styles.controls}>
        
      <SkipButton direction="back" onPress={() => {}} />
      <PlayPauseButton onPress={() => {}} />
      <SkipButton direction="forward" onPress={() => {}} />
      </View>
    </View>
    </PanGestureHandler>
  );
}