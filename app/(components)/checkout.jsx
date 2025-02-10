import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

const CheckoutPage = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    province: "",
  });

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [totalAmount, setTotalAmount] = useState(1500); // Example amount

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      // Replace with your actual backend endpoint
      const response = await axios.get("/api/user/addresses");
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleEsewaPayment = () => {
    // Esewa payment integration placeholder
    Alert.alert("Esewa Payment", "Redirecting to Esewa payment gateway");
  };

  const handleKhaltiPayment = () => {
    // Khalti payment integration placeholder
    Alert.alert("Khalti Payment", "Redirecting to Khalti payment gateway");
  };

  const saveNewAddress = async () => {
    try {
      // Replace with your actual backend endpoint
      await axios.post("/api/user/addresses", newAddress);
      fetchAddresses();
      setNewAddress({
        fullName: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        province: "",
      });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.headerTitle}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={[
              styles.addressCard,
              selectedAddress?.id === address.id && styles.selectedAddress,
            ]}
            onPress={() => setSelectedAddress(address)}
          >
            <Text style={styles.addressName}>{address.fullName}</Text>
            <Text>{address.streetAddress}</Text>
            <Text>
              {address.city}, {address.province}
            </Text>
            <Text>{address.phoneNumber}</Text>
          </TouchableOpacity>
        ))}

        {/* New Address Form */}
        <View style={styles.newAddressForm}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={newAddress.fullName}
            onChangeText={(text) =>
              setNewAddress({ ...newAddress, fullName: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={newAddress.phoneNumber}
            onChangeText={(text) =>
              setNewAddress({ ...newAddress, phoneNumber: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={newAddress.streetAddress}
            onChangeText={(text) =>
              setNewAddress({ ...newAddress, streetAddress: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={newAddress.city}
            onChangeText={(text) =>
              setNewAddress({ ...newAddress, city: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Province"
            value={newAddress.province}
            onChangeText={(text) =>
              setNewAddress({ ...newAddress, province: text })
            }
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveNewAddress}>
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Methods Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              selectedPayment === "esewa" && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment("esewa")}
          >
            <Text>Esewa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              selectedPayment === "khalti" && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment("khalti")}
          >
            <Text>Khalti</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Total Amount</Text>
          <Text>Rs. {totalAmount}</Text>
        </View>
      </View>

      {/* Proceed to Payment Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={
          selectedPayment === "esewa" ? handleEsewaPayment : handleKhaltiPayment
        }
        disabled={!selectedAddress || !selectedPayment}
      >
        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:24,
    // flex: 1,
    backgroundColor: "#f4f4f4",
  },
  backButton: {
    marginRight: 16,
  },
  header: {
    backgroundColor: "#0C7A3D",
    padding: 15,
    // alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedAddress: {
    borderColor: "#0C7A3D",
    backgroundColor: "#E8F5E9",
  },
  addressName: {
    fontWeight: "bold",
  },
  newAddressForm: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#0C7A3D",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentButton: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedPayment: {
    borderColor: "#0C7A3D",
    backgroundColor: "#E8F5E9",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  proceedButton: {
    backgroundColor: "#0C7A3D",
    padding: 15,
    margin: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  proceedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CheckoutPage;
