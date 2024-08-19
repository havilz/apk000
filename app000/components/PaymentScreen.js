import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button } from 'react-native';

const paymentMethods = [
  { id: '1', name: 'Transfer Antar Bank' },
  { id: '2', name: 'E-Money' },
  { id: '3', name: 'Pembayaran Langsung' },
];

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setAccountNumber('');
    setDescription('');
  };

  const handleSave = () => {
    if (selectedMethod) {
      if (selectedMethod.id === '3') {
        // Pembayaran Langsung tidak memerlukan informasi tambahan
        alert('Pembayaran Langsung tidak memerlukan informasi tambahan.');
      } else if (accountNumber && description) {
        // Simpan informasi atau lakukan sesuatu dengan informasi ini
        console.log(`Metode: ${selectedMethod.name}`);
        console.log(`Nomor Rekening: ${accountNumber}`);
        console.log(`Deskripsi: ${description}`);
        alert('Informasi berhasil disimpan!');
      } else {
        alert('Silakan isi semua informasi yang diperlukan.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metode Pembayaran</Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              item.id === selectedMethod?.id && styles.selectedItem,
            ]}
            onPress={() => handleSelectMethod(item)}
          >
            <Text
              style={[
                styles.itemText,
                item.id === selectedMethod?.id && styles.selectedItemText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedMethod && selectedMethod.id !== '3' && (
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>Masukkan Informasi untuk {selectedMethod.name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nomor Rekening atau Nomor E-Money"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Deskripsi"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Simpan" onPress={handleSave} />
        </View>
      )}
      {selectedMethod && selectedMethod.id === '3' && (
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>Pembayaran Langsung tidak memerlukan informasi tambahan.</Text>
        </View>
      )}
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
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedItem: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  itemText: {
    fontSize: 18,
  },
  selectedItemText: {
    color: '#007bff',
  },
  formContainer: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#e9f5ff',
    padding: 15,
    borderRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});