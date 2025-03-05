import React, { useEffect, useCallback } from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../styles";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { StyleSheet} from "react-native";
import SongCard from "../components/SongCard";
import NavButton from "../components/PlayListButton";
import { useGetSongs } from "../hooks/useGetSongs";
import { useAudio } from "../context/AudioContext";

export default function LibraryScreen() {
  const navigation = useNavigation();
    const route = useRoute();
    const isActive = route.name === 'UserPlayList';
    const { changePlaylist } = useAudio();

    const { songs, loading, error, refreshSongs } = useGetSongs('liked');

    useFocusEffect(
      useCallback(() => {
        refreshSongs();
      }, [])
    );
  
    const handlePlaylistsPress = () => {
      if (isActive) {
        navigation.goBack();
      } else {
        navigation.navigate('UserPlayList');
      }
    };



  return (
    <View style={styles.container}>
      <NavButton 
        title="Playlists" 
        onPress={handlePlaylistsPress}
        style={[
          libraryStyles.button,
          isActive && libraryStyles.activeButton
        ]}
        textStyle={[
          libraryStyles.buttonText,
          isActive && libraryStyles.activeButtonText
        ]}
      />
      <Text style={styles.title}>Your Library</Text>
      <FlatList
          data={songs}
          keyExtractor={(item) => item.songId.toString()}
          renderItem={({ item }) => <SongCard song={item} />}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No Liked Songs</Text>
          )}
        />
    </View>
  );
}

// Styles
const libraryStyles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(42, 42, 42, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  activeButton: {
    backgroundColor: "#1DB954",
  },
  buttonText: {
    color: "#f1f1f1",
    fontSize: 16,
    fontWeight: "600",
  },
  activeButtonText: {
    color: "#fff",
  }
});
