import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity } from 'react-native';

// Data dummy untuk ulasan
const reviews = [
  { id: '1', productName: 'Produk A', rating: 4, review: 'Bagus sekali!', image: 'https://via.placeholder.com/100' },
  { id: '2', productName: 'Produk B', rating: 5, review: 'Sangat memuaskan!', image: 'https://via.placeholder.com/100' },
  { id: '3', productName: 'Produk C', rating: 3, review: 'Cukup baik, tapi bisa diperbaiki.', image: 'https://via.placeholder.com/100' },
  // Tambahkan ulasan sesuai kebutuhan
];

const ReviewsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showDetails = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reviewCard} onPress={() => showDetails(item)}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.detailsContainer}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.rating}>Rating: {item.rating} / 5</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      {/* Modal untuk menampilkan ulasan dan rating */}
      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
              <Text style={styles.modalProductName}>{selectedProduct.productName}</Text>
              <Text style={styles.modalRating}>Rating: {selectedProduct.rating} / 5</Text>
              <Text style={styles.modalReview}>Ulasan: {selectedProduct.review}</Text>
              <TouchableOpacity style={styles.button} onPress={closeModal}>
                <Text style={styles.buttonText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
  },
  modalProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalRating: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalReview: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReviewsScreen;