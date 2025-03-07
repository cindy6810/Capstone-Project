import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "../styles";
import { Ionicons } from '@expo/vector-icons';

const defaultCoverImage = require('../assets/note.jpg');

const PlayList = ({ title, playlistId, songs = [], image }) => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate("PlaylistDetail", {
      playlistId,
      title,
      songs,
      image
    });
  }
  
  const getSongCovers = () => {
    const songCovers = [];
    
    if (songs && songs.length > 0) {
      for (let i = 0; i < Math.min(songs.length, 4); i++) {
        if (songs[i]?.song_photo_url) {
          songCovers.push({ uri: songs[i].song_photo_url });
        } else {
          songCovers.push(defaultCoverImage);
        }
      }
    }
    
    // Fill remaining slots with default image if needed
    while (songCovers.length < 4) {
      songCovers.push(defaultCoverImage);
    }
    
    return songCovers;
  };
  
  const songCovers = getSongCovers();
  
  return (
    <TouchableOpacity style={styles.songCard2} onPress={handlePress}>
      <View style={styles.playlistCoverGrid}>
        <View style={styles.playlistCoverRow}>
          <Image source={songCovers[0]} style={styles.playlistCoverQuadrant} />
          <Image source={songCovers[1]} style={styles.playlistCoverQuadrant} />
        </View>
        <View style={styles.playlistCoverRow}>
          <Image source={songCovers[2]} style={styles.playlistCoverQuadrant} />
          <Image source={songCovers[3]} style={styles.playlistCoverQuadrant} />
        </View>
        
        <View style={styles.playlistOverlay}>
          <Text style={styles.songCard2Title}>{title}</Text>
          <Text style={styles.songCard2Artist}>{songs.length || 0} songs</Text>
          
          
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlayList;