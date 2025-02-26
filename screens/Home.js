import React from "react";
import { Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import SongCard from "../components/SongCard";
import SongCard2 from "../components/SongCard2";
import NavButton from "../components/PlayListButton";
import PlayList from "../components/Playlist";
import { ScrollView } from "react-native-gesture-handler";
import { useGetSongs } from "../hooks/useGetSongs";
import { useAudio } from "../context/AudioContext";

export default function HomeScreen() {

  const navigation = useNavigation();
  const { songs, loading, error, refreshSongs } = useGetSongs();
  const { changePlaylist } = useAudio();

  const playlists = [
    { id: "1", title: "My Playlist 1", image: require("../assets/graduation.jpg") },
    { id: "2", title: "My Playlist 2", image: require("../assets/graduation.jpg") },
    
  ];

  React.useEffect(() => {
    if (songs?.length > 0) {
      changePlaylist(songs, 'all');
    }
  }, [songs]);

  

  const renderHeader = () => (
    <>
      
      <Text style={styles.subtitle}>New Music</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f1f1f1" />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.songId.toString()}
          renderItem={({ item }) => <SongCard song={item} />}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No songs available</Text>
          )}
        />
      )}

      <Text style={styles.subtitle}>Featured Music</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f1f1f1" />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.songId.toString()}
          horizontal
          renderItem={({ item }) => <SongCard2 song={item} />}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No featured songs</Text>
          )}
        />
      )}

      <Text style={styles.subtitle}>Playlists</Text>
    </>
  );

  // Styles
  return (
    <View style={styles.container}>
      <FlatList
        data={playlists}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlayList 
            title={item.title}
            playlistId={item.id}
            image={item.image}
          />
        )}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshSongs}
        refreshing={loading}
      />
      {error && (
        <Text style={styles.errorText}>
          Error loading songs: {error}
        </Text>
      )}
    </View>
  );
}

