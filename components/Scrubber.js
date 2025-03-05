import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { styles } from "../styles";

export default function Scrubber() {
  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        value={0.5} // Static value for now
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>0:00</Text>
        <Text style={styles.timeText}>3:00</Text>
      </View>
    </View>
  );
}