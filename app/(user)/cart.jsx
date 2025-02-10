import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CART_ITEMS = [
  {
    id: 1,
    name: "Organic Tomato Seeds",
    price: 199,
    quantity: 2,
    image:
      "https://th.bing.com/th/id/OIP.NcZJHoqQvgEWg8ZJRJsGvQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    name: "Fertilizer NPK 10-10-10",
    price: 299,
    quantity: 1,
    image:
      "https://th.bing.com/th/id/OIP.NcZJHoqQvgEWg8ZJRJsGvQAAAA?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    name: "Pesticide Organic Solution",
    price: 249,
    quantity: 1,
    image:
      "https://th.bing.com/th/id/OIP.NcZJHoqQvgEWg8ZJRJsGvQAAAA?rs=1&pid=ImgDetMain",
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>रु{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Ionicons name="remove" size={20} color="#0C7A3D" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Ionicons name="add" size={20} color="#0C7A3D" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Ionicons name="trash" size={24} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>रु{calculateTotal()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>रु50</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotal}>Total</Text>
          <Text style={styles.summaryTotalValue}>
            रु{calculateTotal() + 50}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => router.navigate("/(components)/checkout")}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0C7A3D",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    color: "#0C7A3D",
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "600",
  },
  summaryTotalValue: {
    fontSize: 18,
    color: "#0C7A3D",
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: "#0C7A3D",
    padding: 16,
    margin: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
