import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, Modal, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function AdminHomeScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ready');
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch('https://f750-180-253-187-87.ngrok-free.app/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          name,
          price,
          description,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menambahkan produk');
      }

      const result = await response.json();
      Alert.alert('Success', result.message || 'Produk berhasil ditambahkan');
      setProducts([...products, { id: Date.now().toString(), image, name, price, description, status }]);
      setImage(null);
      setName('');
      setPrice('');
      setDescription('');
      setStatus('ready');
      setModalVisible(false);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat menambahkan produk');
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
      <Text style={styles.productName}>Nama: {item.name}</Text>
      <Text style={styles.productName}>Harga: {item.price}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.productActions}>
        <Button title="Hapus" onPress={() => deleteProduct(item.id)} />
        <Picker
          selectedValue={item.status}
          style={styles.picker}
          onValueChange={(newStatus) => setProducts(products.map(p => p.id === item.id ? { ...p, status: newStatus } : p))}
        >
          <Picker.Item label="Ready" value="ready" />
          <Picker.Item label="Soldout" value="soldout" />
        </Picker>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.storeName}>Nama Toko</Text>
        </View>
        <TouchableOpacity style={styles.addProductButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addProductButtonText}>Tambah Produk</Text>
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Tambah Produk</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Produk"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Deskripsi"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
            <Text>Pick an image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.productImage} />}
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={setStatus}
          >
            <Picker.Item label="Ready" value="ready" />
            <Picker.Item label="Soldout" value="soldout" />
          </Picker>
          <View style={styles.modalActions}>
            <Button title="Simpan" onPress={addProduct} />
            <Button title="Tutup" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addProductButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  addProductButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  imagePicker: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    marginVertical: 10,
  },
  productCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productDescription: {
    marginVertical: 5,
    fontSize: 14,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
});
