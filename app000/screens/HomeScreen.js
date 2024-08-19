import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Ganti dengan URL gambar Anda
        style={styles.image}
      />
      <Text style={styles.title}>Selamat Datang!</Text>
      <Text style={styles.subtitle}>
        Temukan kehidupan yang mudah dengan aplikasi super untuk semua kebutuhan Anda.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => navigation.navigate('SelectBusinessType')}
      >
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>Registrasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ddd',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: '#0b8457',
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: '#fff',
  },
});
