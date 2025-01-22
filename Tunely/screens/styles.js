import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // General styles
  container: {
    flex: 1,
    backgroundColor: "#182952",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#727D73",
    marginBottom: 20,
  },
  songCard: {
    backgroundColor: "#AAB99A",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  songTitle: {
    color: "#F0F0D7",
    fontWeight: "bold",
  },
  // Top bar styles
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#182952",
    padding: 10,
    paddingTop: 40, 
  },
  profileButton: {
    padding: 5,
  },
  searchBar: {
    backgroundColor: "#D0DDD0",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    color: "#727D73",
  },
  // Tab bar customization
  tabBarStyle: {
    backgroundColor: "#2B3595",
  },
});
