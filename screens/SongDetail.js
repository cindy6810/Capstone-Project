import React, { useState, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { styles } from "../styles";

import Scrubber from "../components/Scrubber";
import PlayPauseButton from "../components/PlayPauseButton";
import SkipButton from "../components/SkipButton";
import CommentScreen from "./CommentScreen";

export default function SongDetailScreen({ route }) {
  const { song } = route.params;
  const navigation = useNavigation();
  const [sliderValue, setSliderValue] = useState(0);

  const handleCommentPress = () => {
    navigation.navigate('CommentScreen', { song });
  };

  const translateY = useRef(new Animated.Value(0)).current;
  const scale = translateY.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });

  // Handle swipe-down gesture 
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > 150) {
        navigation.goBack();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[styles.songDetailsContainer, { transform: [{ translateY }] }]}>
        <View style={styles.imageTitleContainer}>
        <Animated.Image source={song.image} style={[styles.songImage, { transform: [{ scale }] }]} />
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
        </View>
        <Scrubber />
        <View style={styles.controls}>
          <SkipButton direction="back" onPress={() => {}} />
          <PlayPauseButton onPress={() => {}} />
          <SkipButton direction="forward" onPress={() => {}} />
        </View>
        <TouchableOpacity 
          style={styles.commentButton}
          onPress={handleCommentPress}
        >
          <Text style={styles.commentButtonText}>Comments</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
}

