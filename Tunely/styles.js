import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // General styles
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f1f1", 
    marginBottom: 20,
  },
  songCard: {
    backgroundColor: "#182952", // Purple for song cards
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  songTitle: {
    color: "#f1f1f1", 
    fontWeight: "bold",
  },
  // Top bar styles
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#213555", 
    padding: 10,
    paddingTop: 40, // For status bar spacing
  },
  profileButton: {
    padding: 2,
    marginTop: 30,
  },
  searchBar: {
    backgroundColor: "#f1f1f1", // Purple for search bar
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    color: "#f1f1f1", 
  },
  // Tab bar customization
  tabBarStyle: {
    backgroundColor: "#213555", // Match top bar
  },
});
