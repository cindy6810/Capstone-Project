import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBarProfileIcon from "../components/TopBarProfileIcon";

const IMAGES = {
  CONAN_GRAY: require("../assets/images/artists/conan-gray.png"),
  NIGHT_VIBES: require("../assets/images/playlists/night-vibes.png"),
  WIPED_OUT: require("../assets/images/albums/wiped-out.png"),
};

const COLORS = {
  BACKGROUND: "#000000",
  CARD_BACKGROUND: "#121212",
  PRIMARY: "#E14594",
  TEXT_PRIMARY: "#FFFFFF",
  TEXT_SECONDARY: "#AAAAAA",
  INACTIVE: "rgba(42, 42, 42, 0.7)",
  ACTIVE: "#1D1D1D",
  ACTIVE_BORDER: "#444",
};

export default function LibraryScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Playlists");

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handlePlaylistsPress = () => {
    navigation.navigate("UserPlayList");
  };

  const recentlyPlayed = [
    {
      id: "1",
      title: "Conan Gray",
      image: IMAGES.CONAN_GRAY,
      fallbackColor: "#6B5B95",
    },
    {
      id: "2",
      title: "3:00am vibes",
      subtitle: "18 songs",
      image: IMAGES.NIGHT_VIBES,
      fallbackColor: "#3498DB",
    },
    {
      id: "3",
      title: "Wiped Out!",
      subtitle: "The Neighbourhood",
      image: IMAGES.WIPED_OUT,
      fallbackColor: "#2C3E50",
    },
  ];

  const TabButton = ({ title, isActive, onPress }) => {
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        onPress={onPress}
      >
        <Text style={styles.tabButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const LibraryItem = ({ item }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <TouchableOpacity style={styles.libraryItem}>
        <View style={styles.itemImageContainer}>
          {!imageError ? (
            <Image
              source={item.image}
              style={styles.itemImage}
              onError={() => setImageError(true)}
            />
          ) : (
            <View
              style={[
                styles.fallbackImage,
                { backgroundColor: item.fallbackColor },
              ]}
            />
          )}
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const ActionButton = ({ icon, title, onPress }) => {
    return (
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <View style={styles.actionIconContainer}>
          <Text style={styles.actionIcon}>{icon}</Text>
        </View>
        <Text style={styles.actionText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.fullContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.musicIcon}>🎵</Text>
          <Text style={styles.headerTitle}>Your Library</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <TopBarProfileIcon size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TabButton
            title="Playlists"
            isActive={activeTab === "Playlists"}
            onPress={() => {
              setActiveTab("Playlists");
              handlePlaylistsPress();
            }}
          />
          <TabButton
            title="Artists"
            isActive={activeTab === "Artists"}
            onPress={() => setActiveTab("Artists")}
          />
          <TabButton
            title="Albums"
            isActive={activeTab === "Albums"}
            onPress={() => setActiveTab("Albums")}
          />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <ActionButton
            icon="+"
            title="Add New Playlist"
            onPress={() => console.log("Add new playlist")}
          />
          <ActionButton
            icon="♥"
            title="Your Liked Songs"
            onPress={() => console.log("Liked songs")}
          />

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recently played</Text>
            {recentlyPlayed.map((item) => (
              <LibraryItem key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicIcon: {
    fontSize: 30,
    color: COLORS.PRIMARY,
    marginRight: 8,
  },
  headerTitle: {
    color: COLORS.PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    backgroundColor: COLORS.INACTIVE,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: COLORS.ACTIVE,
    borderWidth: 1,
    borderColor: COLORS.ACTIVE_BORDER,
  },
  tabButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionIcon: {
    fontSize: 24,
    color: COLORS.TEXT_PRIMARY,
  },
  actionText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    marginBottom: 12,
  },
  libraryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 4,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#333",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  fallbackImage: {
    width: "100%",
    height: "100%",
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  itemSubtitle: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
  },
});
