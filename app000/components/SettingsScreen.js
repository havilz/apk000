import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>
      
      {/* Tombol untuk navigasi ke Pengaturan Umum */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GeneralSettings')}
      >
        <Text style={styles.buttonText}>Pengaturan Umum</Text>
      </TouchableOpacity>

      {/* Tombol untuk navigasi ke Pengaturan Notifikasi */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NotificationSettings')}
      >
        <Text style={styles.buttonText}>Pengaturan Email/Notifikasi</Text>
      </TouchableOpacity>
      
      {/* Tombol untuk navigasi ke Pengaturan Akun */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AccountSettings')}
      >
        <Text style={styles.buttonText}>Pengaturan Akun</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Latar belakang putih
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Teks hitam
  },
  button: {
    backgroundColor: '#000', // Latar belakang tombol hitam
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff', // Teks tombol putih
    fontSize: 18,
    textAlign: 'center',
  },
});
