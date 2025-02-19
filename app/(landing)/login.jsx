import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { farmerLogin } from "@/util/auth";

const Login = ({}) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = async () => {
    // const res = await farmerLogin(phoneNumber);
    // console.log(res);
    // if (res.status === 200) {
    //   router.navigate("/(tabs)");
    router.navigate("/(tabs)");

    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log In</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Login</Text>
          <View style={styles.activeIndicator} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.navigate("/signup")}
        >
          <Text style={styles.tabText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter Your Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#008847",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 2,
    backgroundColor: "#008847",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#008847",
    fontWeight: "500",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#008847",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Login;
