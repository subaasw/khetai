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
import { useRouter } from "expo-router";

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState("Gwen Stacy");
  const [number, setNumber] = useState("9812345678");
  const [address, setAddress] = useState("Chabahil, Kathmandu");

  const handleBack = () => {
    router.back();
  };

  const handleUpdate = () => {
    // Handle update logic here
    Alert("Profile Updated");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile Image Section */}
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/images/Man.png")}
            style={styles.profileImage}
          />
          <View style={styles.imageIconWrapper}>
            <Ionicons name="add" size={24} color="white" />
          </View>
        </View>
        <TouchableOpacity style={styles.updateImageButton}>
          <Text style={styles.updateImageText}>Update Image</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Edit Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Edit Number</Text>
          <TextInput
            style={styles.input}
            value={number}
            onChangeText={setNumber}
            placeholder="Enter your number"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Edit Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 36,
    backgroundColor: "#0C7A3D",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageIconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0C7A3D",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  updateImageButton: {
    backgroundColor: "#0C7A3D",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  updateImageText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  formContainer: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#0C7A3D",
    margin: 24,
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
