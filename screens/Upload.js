import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { styles } from "../styles";
import { auth } from "../Utility/firebaseConfig";
import { uploadFile, addSongToDatabase } from "../Utility/firebaseConfig";

export default function Upload({ navigation }) {
  const [songTitle, setSongTitle] = useState("");
  const [songImage, setSongImage] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [explicit, setExplicit] = useState("clean");
  const [contributions, setContributions] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSongImage(result.uri);
    }
  };

  const pickSong = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });

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

      const songData = {
        title: songTitle,
        image: imageUrl,
        song: songUrl,
        explicit: explicit === "explicit",
        contributions: contributions.split(",").map((c) => c.trim()),
        userId,
      };

      await addSongToDatabase(songData);
      Alert.alert("Success", "Song uploaded successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error uploading song:", error);
      Alert.alert("Error", "Failed to upload song.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginBottom: 80, top: 50 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.songTitle}>Back</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Song Title"
        value={songTitle}
        onChangeText={setSongTitle}
      />

      <TouchableOpacity style={styles.songCard} onPress={pickImage}>
        <Text style={styles.songTitle}>Pick Song Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.songCard} onPress={pickSong}>
        <Text style={styles.songTitle}>Pick Song File</Text>
      </TouchableOpacity>

      <Picker
        selectedValue={explicit}
        style={styles.picker}
        onValueChange={(itemValue) => setExplicit(itemValue)}
      >
        <Picker.Item label="Clean" value="clean" />
        <Picker.Item label="Explicit" value="explicit" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Contributions (comma separated)"
        value={contributions}
        onChangeText={setContributions}
      />

      <TouchableOpacity style={styles.songCard} onPress={handleUpload}>
        <Text style={styles.songTitle}>Upload Song</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.songCard} onPress={() => Alert.alert("Info", "Schedule upload feature coming soon!")}>
        <Text style={styles.songTitle}>Schedule Upload</Text>
      </TouchableOpacity>
    </View>
  );
}