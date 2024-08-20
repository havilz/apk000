import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://f750-180-253-187-87.ngrok-free.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Cek jenis akun dan arahkan pengguna ke halaman yang sesuai
        if (result.businessType === 'Penyedia Barang Dagangan' || result.businessType === 'Penyedia Jasa') {
          navigation.navigate('AdminScreen', { userId: result.userId });
        } else {
          navigation.navigate('BottomTabs', { userId: result.userId });
        }
      } else {
        Alert.alert('Login Failed', result.message || 'Gagal login');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat login');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
