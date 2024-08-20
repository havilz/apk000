import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SellerInfoScreen({ route, navigation }) {
  const { businessType } = route.params;

  const [homeAddress, setHomeAddress] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [productType, setProductType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = () => {
    return homeAddress && storeName && storeAddress && productType && name && email && phone && password.length >= 8;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      fetch('https://f750-180-253-187-87.ngrok-free.app/api/seller-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_type: businessType,
          name,
          email,
          phone,
          password,
          home_address: homeAddress,
          store_name: storeName,
          store_address: storeAddress,
          product_type: productType,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        Alert.alert('Success', 'Biodata berhasil disimpan.');
        Keyboard.dismiss(); // Hide keyboard on successful submission
        navigation.navigate('AdminScreen');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Gagal menyimpan biodata.');
      });
    } else {
      Alert.alert('Error', 'Harap isi semua data dengan benar.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Isi Biodata Penjual</Text>
        <Text style={styles.subHeaderText}>Tipe Bisnis: {businessType}</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nama"
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
          placeholder="Nomor Handphone"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))} // Allow only numbers
          keyboardType="numeric"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.showPasswordButton} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showPasswordText}>{showPassword ? 'Sembunyikan' : 'Tampilkan'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Alamat Tempat Tinggal"
          placeholderTextColor="#888"
          value={homeAddress}
          onChangeText={setHomeAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama Toko Atau Jasa"
          placeholderTextColor="#888"
          value={storeName}
          onChangeText={setStoreName}
        />
        <TextInput
          style={styles.input}
          placeholder="Alamat Toko Atau Penyedia Jasa"
          placeholderTextColor="#888"
          value={storeAddress}
          onChangeText={setStoreAddress}
        />
        <Picker
          selectedValue={productType}
          style={styles.picker}
          onValueChange={(itemValue) => setProductType(itemValue)}
        >
          <Picker.Item label="Pilih jenis dagangan/jasa" value="" />
          <Picker.Item label="Makanan" value="Makanan" />
          <Picker.Item label="Perabotan" value="Perabotan" />
          <Picker.Item label="Jasa Textil" value="Jasa Textil" />
          <Picker.Item label="Jasa Cathring" value="Jasa Cathring" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Kirim Biodata</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#555', 
    marginBottom: 20,
    fontSize: 16,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordButton: {
    padding: 10,
  },
  showPasswordText: {
    color: '#fff',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});
