import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { signInWithEmailAndPassword } from "../Utility/firebaseConfig";
import GoogleButton from '../components/GoogleButton';

export default function LoginFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Home"); 
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGoogleSignIn = (userInfo) => {
    console.log('User info:', userInfo);
    // Handle user info after successful sign-in
    Alert.alert("Success", "Logged in with Google successfully!");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>

      <GoogleButton onSignIn={handleGoogleSignIn} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1a1a1a", 
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    padding: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#2B3595",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: 'rgba(255,255,255,0.7)',
    marginVertical: 10,
    fontSize: 16,
  },
});
