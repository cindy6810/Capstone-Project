import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function MyUploadButton() {
  const navigation = useNavigation();
  const route = useRoute();
  const isActive = route.name === 'MyUploads';

  const handlePress = () => {
    if (isActive) {
      navigation.goBack();
    } else {
      navigation.navigate('MyUploads');
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, isActive && styles.activeButton]} 
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, isActive && styles.activeText]}>
        My Uploads
      </Text>
    </TouchableOpacity>
  );
}

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
  activeButton: {
    backgroundColor: '#182952',
  },
  buttonText: {
    color: '#f1f1f1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeText: {
    color: '#fff',
  }
});
