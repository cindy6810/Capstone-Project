import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const NavButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(42, 42, 42, 0.7)", // Semi-transparent background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    width: "40%",
  },
  buttonText: {
    color: "#f1f1f1",
    fontSize: 16,
    
  },
});

export default NavButton;