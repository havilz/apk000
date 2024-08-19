import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function GeneralSettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan Umum</Text>

      {/* Pengaturan Kebijakan Pengembalian */}
      <Text style={styles.label}>Kebijakan Pengembalian Barang</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan kebijakan pengembalian barang"
        multiline
        numberOfLines={4}
      />

      {/* Pengaturan Syarat dan Ketentuan */}
      <Text style={styles.label}>Syarat dan Ketentuan</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan syarat dan ketentuan"
        multiline
        numberOfLines={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
