import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { notifications } from "@/constants/notifications";
import { useRouter } from "expo-router";

const NotificationItem = ({ item }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIconName = (type) => {
    switch (type) {
      case "order":
        return "cart-outline";
      case "message":
        return "chatbox-outline";
      case "alert":
        return "alert-circle-outline";
      case "system":
        return "settings-outline";
      default:
        return "notifications-outline";
    }
  };

  return (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={getIconName(item.type)} size={24} color="#0C7A3D" />
        {!item.hasRead && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ViewNotification() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C7A3D",
  },
  header: {
    backgroundColor: "#0C7A3D",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
    backgroundColor: "white",
    height: "100%",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 16,
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4444",
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  message: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
