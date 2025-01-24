import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { signUpWithEmailAndPassword, signInWithGoogle } from "../Utility/firebaseConfig"; 

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation(); 

  const handleSignUp = async () => {
    // Validate email and password
    if (email !== confirmEmail) {
      Alert.alert("Error", "Emails do not match!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      await signUpWithEmailAndPassword(email, password);  
      Alert.alert("Success", "User signed up successfully!");
      // Navigate to login page after successful signup (optional)
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message); 
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      Alert.alert("Success", `Signed in as ${user.displayName}`);
      // Optionally, navigate to the homepage or dashboard
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Google Sign-In Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        placeholder="Username"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Confirm Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={confirmEmail}
        onChangeText={setConfirmEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Sign Up with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1a1a1a", // Updated background color
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
  googleButton: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
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
});
