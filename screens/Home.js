import React, { useCallback } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { styles } from "../styles";
import { useFocusEffect } from "@react-navigation/native";
import SongCard from "../components/SongCard";
import SongCard2 from "../components/SongCard2";
import PlayList from "../components/Playlist";
import { useGetSongs } from "../hooks/useGetSongs";
import { useAudio } from "../context/AudioContext";

export default function HomeScreen() {
  const { songs, loading, error, refreshSongs } = useGetSongs();
  const { changePlaylist } = useAudio();

  const playlists = [
    { id: "1", title: "My Playlist 1", image: require("../assets/graduation.jpg") },
    { id: "2", title: "My Playlist 2", image: require("../assets/graduation.jpg") },
  ];

  // Filtered song categories (Replace with your actual logic)
  const newReleases = songs.slice(0, 10);
  const recentPlayed = songs.slice(-5);
  const trendingSongs = songs.slice(5, 15);
  const rapSongs = songs.filter((song) => song.genre === "Rap").slice(0, 10);
  const popSongs = songs.filter((song) => song.genre === "Pop").slice(0, 10);
  const recommendedSongs = songs.slice(0, 10);

  useFocusEffect(
    useCallback(() => {
      refreshSongs();
    }, [])
  );

  const renderHorizontalList = (title, data) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.subtitle}>{title}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f1f1f1" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.songId.toString()}
          horizontal
          renderItem={({ item }) => <SongCard2 song={item} />}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No songs available</Text>}
        />
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {renderHorizontalList("New Releases", newReleases)}
      <Text style={styles.subtitle}>Most Recent Played</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f1f1f1" />
      ) : (
        <FlatList
          data={recentPlayed}
          keyExtractor={(item) => item.songId.toString()}
          renderItem={({ item }) => <SongCard song={item} />}
          scrollEnabled={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No recently played songs</Text>}
        />
      )}
      {renderHorizontalList("Trending Songs", trendingSongs)}
      {renderHorizontalList("Rap Songs", rapSongs)}
      {renderHorizontalList("Pop Songs", popSongs)}
      {renderHorizontalList("Recommended for Today", recommendedSongs)}

      <Text style={styles.subtitle}>Your Playlists</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={playlists}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlayList title={item.title} playlistId={item.id} image={item.image} />
        )}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshSongs}
        refreshing={loading}
      />
      {error && <Text style={styles.errorText}>Error loading songs: {error}</Text>}
    </View>
  );
}
