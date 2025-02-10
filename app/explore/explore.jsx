import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  {
    id: 1,
    name: "Market Prices",
    icon: "cart-outline",
    backgroundColor: "#E8F5E9",
  },
  {
    id: 2,
    name: "Crop Diseases",
    icon: "leaf-outline",
    backgroundColor: "#E8F5E9",
  },
  {
    id: 3,
    name: "Weather Forecast",
    icon: "cloud-outline",
    backgroundColor: "#E8F5E9",
  },
  {
    id: 4,
    name: "Agricultural Tips",
    icon: "book-outline",
    backgroundColor: "#E8F5E9",
  },
];

const featuredServices = [
  {
    id: 1,
    title: "Crop Price Prediction",
    description: "Predict future crop prices",
    image:
      "https://www.researchgate.net/publication/323481880/figure/fig1/AS:599385951965184@1519916155300/Spatial-prediction-of-major-soil-properties.png",
  },
  {
    id: 2,
    title: "Soil Health Analysis",
    description: "Get comprehensive soil reports",
    image:
      "https://www.researchgate.net/publication/323481880/figure/fig1/AS:599385951965184@1519916155300/Spatial-prediction-of-major-soil-properties.png",
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#0C7A3D" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Search services, crops, tips</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  { backgroundColor: category.backgroundColor },
                ]}
              >
                <Ionicons name={category.icon} size={24} color="#0C7A3D" />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Services */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollContainer}
          >
            {featuredServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.featuredServiceCard}
              >
                <Image
                  source={service.image}
                  style={styles.featuredServiceImage}
                  resizeMode="cover"
                />
                <View style={styles.featuredServiceTextContainer}>
                  <Text style={styles.featuredServiceTitle}>
                    {service.title}
                  </Text>
                  <Text style={styles.featuredServiceDescription}>
                    {service.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0C7A3D",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  searchText: {
    marginLeft: 10,
    color: "#666",
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "#0C7A3D",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
    width: "22%",
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    color: "#0C7A3D",
    textAlign: "center",
  },
  featuredScrollContainer: {
    paddingHorizontal: 20,
  },
  featuredServiceCard: {
    width: 250,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
  },
  featuredServiceImage: {
    width: "100%",
    height: 150,
  },
  featuredServiceTextContainer: {
    padding: 15,
  },
  featuredServiceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0C7A3D",
  },
  featuredServiceDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
