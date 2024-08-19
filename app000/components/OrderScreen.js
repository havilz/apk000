import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

// Data dummy untuk pesanan
const orders = [
  { id: '1', productName: 'Produk A', quantity: 3, status: 'Diproses', date: '2024-08-15', price: 10000 },
  { id: '2', productName: 'Produk B', quantity: 5, status: 'Dikirim', date: '2024-08-14', price: 15000 },
  { id: '3', productName: 'Produk C', quantity: 2, status: 'Selesai', date: '2024-08-13', price: 20000 },
  // Tambahkan pesanan sesuai kebutuhan
];

const OrdersScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter pesanan berdasarkan nama produk
  const filteredOrders = orders.filter(order => 
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mark order as shipped
  const markAsShipped = (orderId) => {
    // Logika untuk memperbarui status pesanan
    alert(`Pesanan ${orderId} telah ditandai sebagai Dikirim`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Rincian pesanan */}
      {selectedOrder && (
        <View style={styles.orderDetail}>
          <Text style={styles.detailText}>Deskripsi: {selectedOrder.productName}</Text>
          <Text style={styles.detailText}>Harga per Unit: Rp{selectedOrder.price}</Text>
          <Text style={styles.detailText}>Total Harga: Rp{selectedOrder.quantity * selectedOrder.price}</Text>
          <TouchableOpacity 
            style={styles.shipButton}
            onPress={() => markAsShipped(selectedOrder.id)}
          >
            <Text style={styles.shipButtonText}>Tandai sebagai Dikirim</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => (
          <View style={styles.orderCard} onTouchEnd={() => setSelectedOrder(item)}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.quantity}>Jumlah: {item.quantity}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text style={styles.date}>Tanggal: {item.date}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  orderDetail: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  shipButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  shipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
