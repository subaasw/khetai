import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const Index = ({}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/login/Splash1.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Online Market for{"\n"}Farmers and{"\n"}Buyers
            </Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => router.navigate("/splash2")}
            >
              <Text style={styles.continueText}>Tap to Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008241",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    objectFit: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    padding: 20,
  },
  contentContainer: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: "rgba(220, 255, 220, 0.9)",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginBottom: 20,
    lineHeight: 36,
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueText: {
    fontSize: 16,
    color: "#008847",
    fontWeight: "600",
  },
});

export default Index;
