import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // General styles
  container: {
    flex: 1,
    backgroundColor: "rgb(4, 4, 4)", 
    padding: 20,
    paddingBottom: 90,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f1f1f1", 
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:"#f1f1f1",
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
  //when using safeareaview for iphone notch
  safeArea: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  // Top bar styles
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(4, 4, 4)", 
    padding: 15,
    paddingTop: 40, // For status bar spacing
  },
  profileButton: {
    padding: 2,
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
    position: 'absolute',
    height: 80,
    paddingBottom: 20,
    overflow: 'hidden',
    elevation: 0, // Remove shadow on Android
    borderTopWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  //Song Detail styles

  songDetailsContainer: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingTop: 50, 
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f1f1",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  songImage: {
    width: 350,
    height: 350,
    marginVertical: 20,
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  imageTitleContainer: {
    alignItems: "center",
    marginVertical: 20,
    width: "80%",
  },
  sliderContainer: {
    width: "80%",
    marginVertical: 20,
  },
  slider: {
    width: "100%",
  },
  sliderContainer: {
    width: "80%",
    marginVertical: 20,
  },
  slider: {
    width: "100%",
  },
  iconButton: {
    padding: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timeText: {
    color: "#fff",
  },
  commentButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  //Song Card Styles
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 2,
    backgroundColor: "transparent",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  // SongCard Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  // cancelButton: {
  //   backgroundColor: "#ccc",
  //   padding: 10,
  //   borderRadius: 5,
  //   flex: 1,
  //   marginRight: 5,
  //   alignItems: "center",
  // },
  confirmButton: {
    backgroundColor: "#ff5555",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 2,
    alignItems: "center",
  },
  // buttonText: {
  //   color: "#fff",
  //   fontWeight: "bold",
  // },
  
  songCardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  songCardInfo: {
    flex: 1,
  },
  songCardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666"
  },
  songCardArtist: {
    fontSize: 12,
    color: "#666",
  },

  songCard2: {
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  songCard2Image: {
    width: 150,
    height: 150,
    justifyContent: "flex-end",
  },
  songCard2TitleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 2,
  },
  songCard2Title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
  activeSongCard: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)', 
  },
  playIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  likeContainer: {
    left: 30,
    bottom: 70,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    paddingHorizontal: 15,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  likeButton: {
    padding: 8,
  },
  likeCount: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 5,
  },
  playlistCoverGrid: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  
  playlistCoverRow: {
    flexDirection: 'row',
    width: '100%',
    height: '50%',
  },
  
  playlistCoverQuadrant: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  playlistOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    justifyContent: 'flex-end',
  },
  
  playlistIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: -15,
    width: '100%',
    gap: 10,
  },


  // Playlist Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  songItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  songItemSelected: {
    backgroundColor: "#ddd",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  createButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: "red",
    textAlign: "center",
  },
  tabContainer: {
  flexDirection: "row",
  marginBottom: 20,
  paddingHorizontal: 16,
  paddingTop: 10,
},

});
