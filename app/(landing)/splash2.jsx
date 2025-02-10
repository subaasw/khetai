import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const Splash2 = ({}) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/login/Splash2.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.whiteCard}>
            <Text style={styles.title}>Smart Farming{"\n"}for Farmers</Text>
            <Text style={styles.subtitle}>
              Supporting farmers every step of the{"\n"}way—from production to
              sale!
            </Text>
            <TouchableOpacity
              style={styles.farmerButton}
              onPress={() => router.navigate("/login")}
            >
              <Text style={styles.farmerButtonText}>LOGIN AS A FARMER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyerButton}
              onPress={() => router.navigate("/loginUser")}
            >
              <Text style={styles.buyerButtonText}>LOGIN AS A BUYER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  whiteCard: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
    lineHeight: 24,
  },
  farmerButton: {
    backgroundColor: "#008847",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    marginBottom: 12,
  },
  farmerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buyerButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    borderWidth: 1,
    borderColor: "#008847",
  },
  buyerButtonText: {
    color: "#008847",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Splash2;
