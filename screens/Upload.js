import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { auth } from "../Utility/firebaseConfig";
import { uploadFile, addSongToDatabase } from "../Utility/firebaseConfig";
import { Ionicons } from "@expo/vector-icons"; 

export default function Upload({ navigation }) {
  const [uploadType, setUploadType] = useState(null); 
  const [songTitle, setSongTitle] = useState("");
  const [songImage, setSongImage] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [explicit, setExplicit] = useState("clean");
  const [contributions, setContributions] = useState("");

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.8 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.assets?.length > 0) {
        setSongImage(response.assets[0].uri);
      }
    });
  };

  const pickSong = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });

    if (!result.canceled) {
      setSongFile(result.uri);
    }
  };

  const handleUpload = async () => {
    if (!songTitle || !songImage || !songFile || !contributions) {
      Alert.alert("Error", "Please fill in all fields and select a song and image.");
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const imageUrl = await uploadFile(userId, songImage, "images");
      const songUrl = await uploadFile(userId, songFile, "songs");

      await addSongToDatabase({
        title: songTitle,
        image: imageUrl,
        song: songUrl,
        explicit: explicit === "explicit",
        contributions: contributions.split(",").map((c) => c.trim()),
        userId,
      });

      Alert.alert("Success", "Song uploaded successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error uploading song:", error);
      Alert.alert("Error", "Failed to upload song.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {!uploadType ? (
        <View style={styles.container}>
          <Text style={styles.title}>What would you like to upload?</Text>
          <TouchableOpacity style={styles.button} onPress={() => setUploadType("song")}>
            <Text style={styles.buttonText}>Upload a Song</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setUploadType("album")}>
            <Text style={styles.buttonText}>Upload an Album</Text>
          </TouchableOpacity>
        </View>
      ) : uploadType === "song" ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={pickSong}>
            <Text style={styles.buttonText}>Upload Song File</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload Picture</Text>
          </TouchableOpacity>

          {songImage && <Image source={{ uri: songImage }} style={styles.songImagePreview} />}

          <TextInput
            style={styles.input}
            placeholder="Name of the Song"
            placeholderTextColor="#aaa"
            value={songTitle}
            onChangeText={setSongTitle}
          />

          <Picker selectedValue={explicit} style={styles.picker} onValueChange={setExplicit}>
            <Picker.Item label="Clean" value="clean" />
            <Picker.Item label="Explicit" value="explicit" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Contributions (comma separated)"
            placeholderTextColor="#aaa"
            value={contributions}
            onChangeText={setContributions}
          />

          <TouchableOpacity style={styles.button} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Info", "Schedule upload feature coming soon!")}
          >
            <Text style={styles.buttonText}>Schedule Upload</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Upload Album (Coming Soon)</Text>
          <TouchableOpacity style={styles.button} onPress={() => setUploadType(null)}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f1f1",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#213555",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#f1f1f1",
    fontWeight: "bold",
    fontSize: 16,
  },
  songImagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#f1f1f1",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  picker: {
    backgroundColor: "#2a2a2a",
    color: "#f1f1f1",
    marginBottom: 10,
    width: "100%",
  },
});
