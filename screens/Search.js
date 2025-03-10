import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function Search() {
  // Popular artists data - with local image paths
  const popularArtists = [
    {
      id: "1",
      name: "Sarah Melody",
      image: require("../assets/search/artists/sarah.png"),
    },
    {
      id: "2",
      name: "Javier Cruz",
      image: require("../assets/search/artists/javier.png"),
    },
    {
      id: "3",
      name: "Maya Kapoor",
      image: require("../assets/search/artists/maya.png"),
    },
    {
      id: "4",
      name: "Andre Williams",
      image: require("../assets/search/artists/andre.png"),
    },
    {
      id: "5",
      name: "Alicia Harmon",
      image: require("../assets/search/artists/alicia.png"),
    },
  ];

  // Playlist data - with local image paths
  const playlists = [
    {
      id: "1",
      name: "Mindful Musings",
      image: require("../assets/search/playlists/mindful.png"),
    },
    {
      id: "2",
      name: "The Cri...",
      image: require("../assets/search/playlists/creative.png"),
    },
    {
      id: "3",
      name: "Tech Talk Radio",
      image: require("../assets/search/playlists/tech-talk.png"),
    },
  ];

  // Browse categories - with local image paths
  const browseCategories = [
    // Row 1
    {
      id: "1",
      name: "Made for You",
      color: "#4A90E2",
      icon: require("../assets/search/categories/made-for-you.png"),
    },
    {
      id: "2",
      name: "RELEASED",
      subtext: "Top New Songs",
      color: "#9013FE",
      icon: require("../assets/search/categories/released.png"),
    },
    // Row 2
    {
      id: "3",
      name: "Music Charts",
      color: "#4F52FF",
      icon: require("../assets/search/categories/music-charts.png"),
    },
    {
      id: "4",
      name: "Podcasts",
      color: "#D0021B",
      icon: require("../assets/search/categories/podcasts.png"),
    },
    // Row 3
    {
      id: "5",
      name: "Bollywood",
      color: "#B8860B",
      icon: require("../assets/search/categories/bollywood.png"),
    },
    {
      id: "6",
      name: "Pop Fusion",
      color: "#50E3C2",
      icon: require("../assets/search/categories/pop-fusion.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for something"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Popular Artists Section - Horizontal scrolling for 5 artists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Artists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularArtists.map((artist) => (
              <TouchableOpacity key={artist.id} style={styles.artistCard}>
                <Image source={artist.image} style={styles.artistImage} />
                <Text style={styles.artistName}>{artist.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Playlist Section - Horizontal scrolling for 3 playlists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Playlist</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {playlists.map((playlist) => (
              <TouchableOpacity key={playlist.id} style={styles.playlistCard}>
                <Image source={playlist.image} style={styles.playlistImage} />
                <Text style={styles.playlistName}>{playlist.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Browse All Section - Vertical scrolling for 3 rows of 2 categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse All</Text>
          <View style={styles.browseGrid}>
            {browseCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: category.color },
                ]}
              >
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  {category.subtext && (
                    <Text style={styles.categorySubtext}>
                      {category.subtext}
                    </Text>
                  )}
                </View>
                {/* 图片占位，但不显示重复的文字 */}
                <View style={styles.categoryIconContainer}>
                  <Image source={category.icon} style={styles.categoryIcon} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 底部导航栏 - 仅保留一个，使用简单的图标和文字 */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>🔍</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16, // 添加底部填充，避免内容被导航栏遮挡
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 20,
    color: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchIcon: {
    position: "absolute",
    right: 15,
  },
  searchIconText: {
    fontSize: 18,
    color: "#888",
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  // Artist styles
  artistCard: {
    marginRight: 16,
    width: 100,
    alignItems: "center",
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  artistName: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  // Playlist styles
  playlistCard: {
    marginRight: 16,
    width: 160,
  },
  playlistImage: {
    width: 160,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistName: {
    color: "#fff",
    fontSize: 14,
  },
  // Browse categories styles
  browseGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  categoryContent: {
    flex: 1,
    justifyContent: "center",
  },
  categoryName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categorySubtext: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain", // 确保图标适当缩放
  },
  // Bottom Navigation - 确保只有一个导航栏
  navbar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#0A0E20",
    borderTopWidth: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    fontSize: 20,
    color: "#888",
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: "#888",
  },
  activeNavItem: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  activeNavIcon: {
    color: "#fff",
  },
  activeNavText: {
    color: "#fff",
  },
});
