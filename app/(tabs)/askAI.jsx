import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { client } from "@/util/network";

export default function AskAIScreen() {
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

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

  useEffect(() => {
    // Request audio permissions when component mounts
    Audio.requestPermissionsAsync();
    
    // Initialize audio mode
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    return () => {
      // Cleanup recording if component unmounts while recording
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const openAIChat = async (message) => {
    const res = await client.post("/chat", {
      message: message,
    });

    const botResponse = {
      text: res.data.text || "Sorry, I couldn't process that.",
      isUser: false,
      timestamp: new Date().toISOString(),
    };

    return botResponse;
  } 

  const handleChatMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      text: inputText,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await openAIChat(inputText);

      setMessages((prev) => [...prev, res]);
    } catch (error) {
      console.error("Chat error:", error);
      Alert.alert("Error", "Failed to get response from the AI");
    } finally {
      setIsLoading(false);
    }
  };

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

      // Add a message to show recording status
      setMessages(prev => [...prev, {
        text: "🎤 Recording...",
        isUser: true,
        isTemporary: true,
        timestamp: new Date().toISOString(),
      }]);
    } catch (error) {
      console.error("Recording error:", error);
      Alert.alert("Recording Error", error.message);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      // Remove the temporary recording message
      setMessages(prev => prev.filter(msg => !msg.isTemporary));
      
      setIsLoading(true);
      
      // Create form data to send the audio file
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/wav',
        name: 'recording.wav',
      });

      try {
        // Send the audio file to your server
        const response = await client.post("/upload/voice", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Add the transcribed text as a user message
        if (response.data.text) {
          setMessages(prev => [...prev, {
            text: response.data.text,
            isUser: true,
            timestamp: new Date().toISOString(),
          }]);

          const res = await openAIChat(response.data.text);

        

          // const audioUri = URL.createObjectURL(audioBlob);
          // await playSound(audioUri);

          setMessages((prev) => [...prev, res]);

        }
      } catch (error) {
        console.error("Error sending audio:", error);
        Alert.alert("Error", "Failed to process audio message");
      } finally {
        setIsLoading(false);
      }

      setRecording(null);
      setIsRecording(false);
    } catch (error) {
      console.error("Error stopping recording:", error);
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

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const MessageBubble = ({ message }) => (
    <View
      style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.botBubble,
        message.isTemporary && styles.temporaryBubble,
      ]}
    >
      <Text style={[
        styles.messageText,
        message.isUser ? styles.userText : styles.botText,
        message.isTemporary && styles.temporaryText,
      ]}>
        {message.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require("@/assets/images/Logo-250x250.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Smart Farming, Fair Prices</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          keyboardShouldPersistTaps="handled"
        >
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

          {/* Suggestion Pills */}
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.suggestionPill}
                onPress={() => setInputText(suggestion.nepali)}
              >
                <Text style={styles.suggestionText}>{suggestion.nepali}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Messages */}
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>KhetAI is thinking...</Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Input Section */}
        <View style={styles.bottomContainer}>
          {/* Input Container */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="आप्रश्न सोध्नु होस्"
              placeholderTextColor="#666"
              multiline
              maxHeight={100}
              editable={!isRecording}
            />
            <TouchableOpacity 
              onPress={handleChatMessage} 
              style={styles.sendButton}
              disabled={!inputText.trim() || isLoading || isRecording}
            >
              <Ionicons 
                name="arrow-forward" 
                size={24} 
                color={!inputText.trim() || isLoading || isRecording ? "#ccc" : "#0C7A3D"} 
              />
            </TouchableOpacity>
          </View>

          {/* Microphone Button */}
          <TouchableOpacity
            style={[
              styles.micButton,
              isRecording && styles.micButtonRecording,
              isLoading && styles.micButtonDisabled
            ]}
            onPress={handleMicPress}
            disabled={isLoading}
          >
            <Ionicons 
              name={isRecording ? "stop" : "mic"} 
              size={32} 
              color={isLoading ? "#ccc" : "white"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  logoSection: {
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
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
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingBottom: 20,
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
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 8,
  },
  userBubble: {
    backgroundColor: "#0C7A3D",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  temporaryBubble: {
    backgroundColor: "#E0E0E0",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: "#333333",
  },
  temporaryText: {
    fontStyle: "italic",
    color: "#666666",
  },
  loadingContainer: {
    padding: 12,
    alignItems: "center",
  },
  loadingText: {
    color: "#666",
    fontStyle: "italic",
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 82,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
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
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  micButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0C7A3D",
    justifyContent: "center",
    alignItems: "center",
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
  micButtonDisabled: {
    backgroundColor: "#E0E0E0",
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
});