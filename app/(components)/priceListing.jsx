import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  RefreshControl, 
  TouchableOpacity, 
  StatusBar, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DARK_GREEN = '#1B4332';
const LIGHT_GREEN = '#2D6A4F';
const ACCENT_GREEN = '#40916C';

// Updated dummy data with Nepalese currency values
const dummyData = [
  {
    id: 1,
    name: 'Potato (Local)',
    minPrice: 34,
    maxPrice: 38,
    currentPrice: 36.00,
    unit: 'kg'
  },
  {
    id: 2,
    name: 'Onion (Indian)',
    minPrice: 64,
    maxPrice: 66,
    currentPrice: 65.00,
    unit: 'kg'
  },
  {
    id: 3,
    name: 'Carrot (Local)',
    minPrice: 20,
    maxPrice: 40,
    currentPrice: 35.00,
    unit: 'kg'
  },
  {
    id: 4,
    name: 'Tomato',
    minPrice: 10,
    maxPrice: 25,
    currentPrice: 12.33,
    unit: 'kg'
  },
  {
    id: 5,
    name: 'Cauliflower',
    minPrice: 8,
    maxPrice: 12,
    currentPrice: 10.00,
    unit: 'kg'
  }
];

// Helper function to format Nepalese currency
const formatNepaleseCurrency = (amount) => {
  return `रू ${amount.toFixed(2)}`;
};

const PriceListingPage = () => {
    const router = useRouter()
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(dummyData);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_GREEN} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>बजार मूल्य सूची</Text>
          <Text style={styles.updateTime}>
            अन्तिम अपडेट: {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </View>
      
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, styles.nameColumn]}>वस्तु</Text>
        <Text style={styles.columnHeader}>न्यूनतम</Text>
        <Text style={styles.columnHeader}>अधिकतम</Text>
        <Text style={styles.columnHeader}>हालको</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[DARK_GREEN]}
            tintColor={DARK_GREEN}
          />
        }
      >
        {data.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.row}
            onPress={() => {/* Handle item press */}}
          >
            <Text style={[styles.cell, styles.nameColumn]}>{item.name}</Text>
            <Text style={styles.cell}>{formatNepaleseCurrency(item.minPrice)}</Text>
            <Text style={styles.cell}>{formatNepaleseCurrency(item.maxPrice)}</Text>
            <Text style={[styles.cell, styles.currentPrice]}>
              {formatNepaleseCurrency(item.currentPrice)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_GREEN,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight + 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  updateTime: {
    fontSize: 12,
    color: '#B7E4C7',
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
  },
  nameColumn: {
    flex: 2,
    textAlign: 'left',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'right',
    color: '#333',
  },
  currentPrice: {
    color: ACCENT_GREEN,
    fontWeight: 'bold',
  },
});

export default PriceListingPage;