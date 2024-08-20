import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function BuyerRegistrationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Validasi input
      if (!name || !email || !password) {
        Alert.alert('Error', 'Semua field harus diisi');
        return;
      }

      // Kirim data ke backend
      const response = await fetch('https://f750-180-253-187-87.ngrok-free.app/api/buyer-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Pendaftaran berhasil. Silakan login.');
        // Navigasi ke halaman login atau halaman lain yang sesuai
        navigation.navigate('BottomTabs');
      } else {
        Alert.alert('Error', result.message || 'Pendaftaran gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat pendaftaran');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pendaftaran Pembeli</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
});
