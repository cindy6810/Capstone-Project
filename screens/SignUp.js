import React, { useState, useRef, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Animated 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { authService } from "../services/authService";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSignUp = async () => {
    if (email !== confirmEmail) {
      Alert.alert("Error", "Emails do not match!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      await authService.registerUser(email, password, username);
      Alert.alert("Success", "User signed up successfully!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.signUpBox, { opacity: fadeAnim }]}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Sign Up</Text>

        {/* Username Input */}
        <TextInput
          placeholder="Username"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Confirm Email Input */}
        <TextInput
          placeholder="Confirm Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={confirmEmail}
          onChangeText={setConfirmEmail}
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Confirm Password Input */}
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Sign Up Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button
            mode="contained"
            onPress={handleSignUp}
            icon="account-plus"
            uppercase={false}
            contentStyle={{ height: 50, backgroundColor: "#213555" }}
            style={styles.paperButton}
            labelStyle={{ fontWeight: "700", fontSize: 16 }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            Sign Up
          </Button>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
  },
  signUpBox: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#182952",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F1F1F1",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F1F1F1",
    color: "#000",
    borderRadius: 8,
    width: "100%",
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  paperButton: {
    width: "100%",
    borderRadius: 25,
    marginBottom: 15,
    elevation: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    padding: 8,
  },
  backButtonText: {
    color: "#F1F1F1",
    fontSize: 16,
    fontWeight: "bold",
  },
});
