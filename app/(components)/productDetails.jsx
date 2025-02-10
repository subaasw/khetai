import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProductDetails = ({ product }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartButton}>
          <Feather name="heart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.contentContainer}>
          <View style={styles.productHeader}>
            <View>
              <Text style={styles.productName}>{product.name}</Text>
              {product.subtitle && (
                <Text style={styles.productSubtitle}>{product.subtitle}</Text>
              )}
            </View>
            <Text style={styles.price}>₹{product.price}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviews}>({product.reviews} reviews)</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description ||
                "Fresh and high-quality product from verified sellers. Available for immediate purchase."}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{product.category}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Stock</Text>
                <Text style={styles.detailValue}>Available</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Unit</Text>
                <Text style={styles.detailValue}>1 kg</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Delivery</Text>
                <Text style={styles.detailValue}>2-3 days</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartButton} onPress={()=> router.navigate('/(user)/cart')}>
          <Text style={styles.buttonText}>Add to Cart</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    marginTop: 36,
  },
  backButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },
  heartButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "600",
  },
  productSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2E7D32",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: "500",
  },
  reviews: {
    fontSize: 14,
    color: "gray",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  detailItem: {
    width: "45%",
  },
  detailLabel: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  addToCartButton: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProductDetails;
