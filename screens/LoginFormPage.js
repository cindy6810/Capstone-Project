import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleButton from '../components/GoogleButton';
import { authService } from '../services/authService'; 
import { auth } from "../Utility/firebaseConfig";
import { Button } from 'react-native-paper';

export default function LoginFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Home"); 
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const userInfo = await authService.signInWithGoogleAuth();
      console.log('Received from GoogleButton:', userInfo);
      console.log('User info:', userInfo);
      Alert.alert("Success", "Logged in with Google successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert("Error", error.message || "Failed to sign in with Google");
    }
    finally {
      setIsLoading(false); // Add this
    }
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
     <Button
      mode="contained" 
      onPress={handleLogin}
      loading={isLoading}
      dark={true}
      icon="login"
      uppercase={false}
      contentStyle={{ height: 50, backgroundColor: '#004e92' }}  
      style={{
        width: '100%',
        borderRadius: 25,
        marginBottom: 15,
        elevation: 8,
        marginTop: 10,
      }}
  labelStyle={{ fontWeight: '700', fontSize: 16 }}>
  Log In
</Button>


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
    color: "#ffffff",
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
  paperButton: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#004e92',
  }
});
