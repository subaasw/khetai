import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Profile = ({}) => {
  const router = useRouter();
  const handlePress = () => {
    const url = "https://forms.gle/r84UvAPNTdktVa9b7";
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("@/assets/images/Man.png")}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </View>
        <Text style={styles.name}>Miles Morales</Text>
        <Text style={styles.username}>@MilesMorales07</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.navigate("/(components)/editProfile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>56</Text>
              <Text style={styles.statLabel}>Finished</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Unfinished</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>14</Text>
              <Text style={styles.statLabel}>Dropped</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={()=> router.navigate('/(components)/priceListing')}>
            <Ionicons name="list-sharp" size={24} color="#333" />
            <Text style={styles.menuText}>Live Price Listing</Text>
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.navigate("/(components)/viewNotification")}
          >
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <Text style={styles.menuText}>Notification</Text>
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
            <Ionicons name="star-outline" size={24} color="#333" />
            <Text style={styles.menuText}>Rate Us</Text>
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.navigate("/(landing)/splash2")}
          >
            <Ionicons name="log-out-outline" size={24} color="#333" />
            <Text style={styles.menuText}>Log Out</Text>
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008847",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#008847",
    marginTop: 36,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#008847",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#008847",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  username: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
  },
  bottomContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  statsContainer: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008847",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
  },
});

export default Profile;
