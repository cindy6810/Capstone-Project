import React, { useState, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { styles } from "../styles";
import Scrubber from "../components/Scrubber";
import PlayPauseButton from "../components/PlayPauseButton";
import SkipButton from "../components/SkipButton";
import { useAudio } from "../context/AudioContext";

const defaultCoverImage = require('../assets/note.jpg');

export default function SongDetailScreen({ route }) {
  const { song } = route.params;
  const navigation = useNavigation();
  const [sliderValue, setSliderValue] = useState(0);
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const translateY = useRef(new Animated.Value(0)).current;
  const { currentSong, isPlaying, playNextSong, playPreviousSong, playlist } = useAudio();

  const handleNext = async () => {
    const currentIndex = playlist.findIndex(s => s.songId === song.songId);
    if (currentIndex < playlist.length - 1) {
      const nextSong = playlist[currentIndex + 1];
      await playNextSong();
      navigation.replace('SongDetail', { song: nextSong });
    }
  };

  const handlePrevious = async () => {
    const currentIndex = playlist.findIndex(s => s.songId === song.songId);
    if (currentIndex > 0) {
      const previousSong = playlist[currentIndex - 1];
      await playPreviousSong();
      navigation.replace('SongDetail', { song: previousSong });
    }
  };
  
  
  const scale = translateY.interpolate({
    inputRange: [-150, 0, 400],
    outputRange: [0.25, 1, 0.40],
    extrapolate: 'clamp',
  });

  const translateX = translateY.interpolate({
    inputRange: [-200, 0, 400],
    outputRange: [-550, 0, -180],
    extrapolate: 'clamp',
  });

  const imageTranslateY = translateY.interpolate({
    inputRange: [-150, 0, 400],
    outputRange: [-280, 0, SCREEN_HEIGHT - 150],
    extrapolate: 'clamp',
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > 200) {
        Animated.timing(translateY, {
          toValue: 200,
          duration: 200,
          useNativeDriver: true,
        }).start(() => navigation.goBack());
      } else if (event.nativeEvent.translationY < -200) {
        navigation.navigate('CommentScreen', { song });
        Animated.timing(translateY, {
          toValue: -200,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 40
        }).start();
      }
    }
  };
//resets screen position when coming back to it 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      translateY.setValue(0);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[styles.songDetailsContainer, { transform: [{ translateY }] }]}>
        <View style={styles.imageTitleContainer}>
          <Animated.Image 
            source={
              song.song_photo_url 
                ? { uri: song.song_photo_url }
                : defaultCoverImage
            }
            style={[
              styles.songImage, 
              { 
                transform: [
                  { scale },
                  { translateX },
                  { translateY: imageTranslateY }
                ] 
              }
            ]} 
          />
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artistName}</Text>
        </View>
        <Scrubber />
        <View style={styles.controls}>
          <SkipButton direction="back" onPress={handlePrevious} />
          <PlayPauseButton 
            song={song}
            isPlaying={isPlaying && currentSong?.songId === song.songId}
          />
          <SkipButton direction="forward" onPress={handleNext} />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}