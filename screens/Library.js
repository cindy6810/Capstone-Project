import React, { useEffect, useCallback } from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../styles";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { StyleSheet} from "react-native";
import SongCard from "../components/SongCard";
import PlaylistButton from "../components/PlayListButton";
import { useGetSongs } from "../hooks/useGetSongs";
import MyUploadButton from '../components/MyUploadButton';

export default function LibraryScreen() {

    const { songs, loading, error, refreshSongs } = useGetSongs('liked');

    useFocusEffect(
      useCallback(() => {
        refreshSongs();
      }, [])
    );
  
  return (
    <View style={styles.container}>
      <View style={libraryStyles.buttonContainer}>
      <PlaylistButton />
      <MyUploadButton />
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '100%',
    gap: 10,
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
