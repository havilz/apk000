import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function AccountSettings({ navigation }) {
  const [ownerData, setOwnerData] = useState({
    name: 'Nama Pemilik',
    email: 'email@example.com',
    businessName: 'Nama Toko',
    phone: '08123456789',
  });

  const handleDeleteAccount = () => {
    Alert.alert(
      'Konfirmasi Penghapusan',
      'Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan.',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => {
          // Logika penghapusan akun
          console.log('Akun dihapus');
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan Akun</Text>

      <Text style={styles.label}>Nama: {ownerData.name}</Text>
      <Text style={styles.label}>Email: {ownerData.email}</Text>
      <Text style={styles.label}>Nama Toko: {ownerData.businessName}</Text>
      <Text style={styles.label}>Nomor Telepon: {ownerData.phone}</Text>

      {/* Tombol untuk menghapus akun */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Hapus Akun</Text>
      </TouchableOpacity>
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
  button: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
