import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

export default function AskAIScreen() {
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const suggestions = [
    {
      nepali: "कीरा किराहरुको बारेमा जानकारी दिनुस्",
      english: "Tell me about pests",
    },
    {
      nepali: "बाली उब्जना बढाउने उपाय",
      english: "Ways to increase crop yield",
    },
    {
      nepali: "कीरा किराहरुबाट सुरक्षित तरिका",
      english: "Safe methods from pests",
    },
  ];

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please allow microphone access to record audio."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert("Recording Error", error.message);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      // Here you would typically send the audio file to your backend
      console.log("Recording saved at:", uri);

      setRecording(null);
      setIsRecording(false);
    } catch (error) {
      Alert.alert("Error Stopping Recording", error.message);
    }
  }

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image
          source={require("@/assets/images/Logo-250x250.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Smart Farming, Fair Prices</Text>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("@/assets/images/KhetAI.png")}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.greeting}>
          <Text style={styles.nepaliText}>नमस्ते</Text>, Subash
        </Text>
      </View>

      {/* Microphone Button */}
      <TouchableOpacity
        style={[styles.micButton, isRecording && styles.micButtonRecording]}
        onPress={handleMicPress}
      >
        <Ionicons name={isRecording ? "stop" : "mic"} size={32} color="white" />
      </TouchableOpacity>

      {/* Suggestion Pills */}
      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity key={index} style={styles.suggestionPill}>
            <Text style={styles.suggestionText}>{suggestion.nepali}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="आप्रश्न सोध्नु होस्"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="arrow-forward" size={24} color="#0C7A3D" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  logoSection: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 150,
    height: 40,
  },
  tagline: {
    color: "#0C7A3D",
    fontSize: 16,
    marginTop: 8,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 40,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0C7A3D",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  greeting: {
    fontSize: 18,
    marginTop: 16,
    color: "#333",
  },
  nepaliText: {
    fontWeight: "500",
  },
  micButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0C7A3D",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  micButtonRecording: {
    backgroundColor: "#FF4444",
  },
  suggestionsContainer: {
    marginTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  suggestionPill: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0C7A3D",
  },
  suggestionText: {
    color: "#0C7A3D",
    fontSize: 14,
  },
  inputContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
});
