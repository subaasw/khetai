import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    // padding: 15,
    borderRadius: 25,
    // marginBottom: 20,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MyButton;
