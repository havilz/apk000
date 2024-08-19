import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SelectBusinessTypeScreen({ navigation }) {
  const handleBusinessTypeSelection = (businessType) => {
    if (businessType === 'Daftar sebagai pembeli') {
      navigation.navigate('BuyerRegistrations'); // Pastikan nama screen benar
    } else {
      navigation.navigate('SellerInfo', { businessType });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pilih Jenis Bisnis</Text>
      <TouchableOpacity style={styles.option} onPress={() => handleBusinessTypeSelection('Penyedia Barang Dagangan')}>
        <Text style={styles.optionText}>Penyedia Barang Dagangan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleBusinessTypeSelection('Penyedia Jasa')}>
        <Text style={styles.optionText}>Penyedia Jasa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleBusinessTypeSelection('Daftar sebagai pembeli')}>
        <Text style={styles.optionText}>Daftarkan diri anda sebagai pembeli.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
});
