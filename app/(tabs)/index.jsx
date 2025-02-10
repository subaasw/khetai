import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { products, recommendedProducts } from "@/constants/data";

const { width } = Dimensions.get("window");

const ProductCard = ({ item }) => (
  <TouchableOpacity style={styles.productCard}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <Text style={styles.productName}>{item.name}</Text>
    <Text style={styles.productPrice}>Rs.{item.price}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KhetAI</Text>
        <TouchableOpacity>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Image
          source={{ uri: "/api/placeholder/400/200" }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextOverlay}>
          <Text style={styles.bannerText}>KhetAI</Text>
          <Text style={styles.bannerSubtext}>Fresh Collection</Text>
        </View>

        {/* New Arrivals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* Recommended Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <View style={styles.recommendedGrid}>
            {recommendedProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    // marginTop: 30,
  },
  menuIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchIcon: {
    fontSize: 24,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  bannerTextOverlay: {
    position: "absolute",
    top: 100,
    left: 20,
  },
  bannerText: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
  },
  bannerSubtext: {
    color: "black",
    fontSize: 24,
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  viewAll: {
    color: "#666",
  },
  productCard: {
    marginRight: 15,
    width: 150,
  },
  productImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  productName: {
    marginTop: 8,
    fontSize: 16,
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  recommendedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    color: "black",
  },
});
