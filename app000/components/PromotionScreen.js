import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; // Import ikon

// Daftar produk dummy
const products = [
  { id: '1', name: 'Produk A' },
  { id: '2', name: 'Produk B' },
  { id: '3', name: 'Produk C' },
  // Tambahkan produk lainnya
];

const PromotionScreen = () => {
  const [promotionName, setPromotionName] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [availableProducts, setAvailableProducts] = useState(products);
  const [promotionsList, setPromotionsList] = useState([]);

  const handleSavePromotion = () => {
    if (!promotionName || !discount || selectedProducts.length === 0) {
      alert('Please fill in all fields and select at least one product');
      return;
    }
    const newPromotion = {
      id: (promotionsList.length + 1).toString(),
      name: promotionName,
      discount: discount,
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
      products: selectedProducts,
    };
    setPromotionsList([...promotionsList, newPromotion]);
    setPromotionName('');
    setDiscount('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedProducts([]);
  };

  const toggleProductSelection = (product) => {
    setSelectedProducts(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const selectedProductNames = availableProducts
    .filter(product => selectedProducts.includes(product.id))
    .map(product => product.name)
    .join(', ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Promosi dan Diskon</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Promosi"
        value={promotionName}
        onChangeText={setPromotionName}
      />
      <TextInput
        style={styles.input}
        placeholder="Diskon (%)"
        value={discount}
        onChangeText={setDiscount}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateText}>Tanggal Mulai: {startDate.toDateString()}</Text>
        <Ionicons name="calendar" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateText}>Tanggal Berakhir: {endDate.toDateString()}</Text>
        <Ionicons name="calendar" size={24} color="#000" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.productButton} onPress={() => setShowProductSelector(true)}>
        <Text style={styles.productText}>Produk Terpilih: {selectedProductNames || 'Pilih Produk'}</Text>
        <Ionicons name="chevron-down" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePromotion}>
        <Text style={styles.saveButtonText}>Simpan Promosi</Text>
      </TouchableOpacity>

      <FlatList
        data={promotionsList}
        renderItem={({ item }) => (
          <View style={styles.promotionCard}>
            <Text style={styles.promotionName}>{item.name}</Text>
            <Text style={styles.promotionDiscount}>Diskon: {item.discount}</Text>
            <Text style={styles.promotionDates}>Periode: {item.startDate} - {item.endDate}</Text>
            <Text style={styles.promotionProducts}>Produk: {item.products.map(id => products.find(product => product.id === id)?.name).join(', ')}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      <Modal visible={showProductSelector} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pilih Produk</Text>
          <ScrollView>
            {availableProducts.map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.productItem}
                onPress={() => toggleProductSelection(product)}
              >
                <Text style={styles.productName}>{product.name}</Text>
                {selectedProducts.includes(product.id) && <Text style={styles.checkmark}>✔</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowProductSelector(false)}>
            <Text style={styles.closeButtonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Latar belakang putih
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Teks hitam
  },
  input: {
    borderWidth: 1,
    borderColor: '#000', // Border hitam
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#000', // Teks hitam
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000', // Border hitam
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#f0f0f0', // Latar belakang abu-abu terang
  },
  dateText: {
    fontSize: 16,
    color: '#000', // Teks hitam
  },
  productButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000', // Border hitam
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#f0f0f0', // Latar belakang abu-abu terang
  },
  productText: {
    fontSize: 16,
    color: '#000', // Teks hitam
  },
  promotionCard: {
    backgroundColor: '#fff', // Latar belakang putih
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000', // Border hitam
  },
  promotionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Teks hitam
  },
  promotionDiscount: {
    fontSize: 16,
    color: '#000', // Teks hitam
  },
  promotionDates: {
    fontSize: 16,
    color: '#000', // Teks hitam
  },
  promotionProducts: {
    fontSize: 16,
    color: '#000', // Teks hitam
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Latar belakang putih
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Teks hitam
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Border bawah abu-abu
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    color: '#000', // Teks hitam
  },
  checkmark: {
    fontSize: 20,
    color: '#000', // Tanda centang hitam
  },
  saveButton: {
    backgroundColor: '#000', // Latar belakang hitam
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff', // Teks putih
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#000', // Latar belakang hitam
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff', // Teks putih
    textAlign: 'center',
  },
});

export default PromotionScreen;
