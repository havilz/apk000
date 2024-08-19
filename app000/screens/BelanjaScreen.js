import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../LogComponent/Header';
import BannerPromosi from '../LogComponent/BannerPromosi';
import TokoList from '../LogComponent/TokoList';
import ProdukList from '../LogComponent/ProdukList';

const BelanjaScreen = () => {
  const [produkData, setProdukData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.1.11:3000/api/products');
        const data = await response.json();
        setProdukData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const bannerData = [
    { image: 'https://link-to-image1.com', title: 'Product 1' },
    { image: 'https://link-to-image2.com', title: 'Product 2' },
  ];

  const tokoData = [
    { name: 'Toko 1' },
    { name: 'Toko 2' },
    { name: 'Toko 3' },
  ];

  // Menggabungkan semua data
  const data = [
    { type: 'banner', data: bannerData },
    { type: 'toko', data: tokoData },
    { type: 'produk', data: produkData },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'banner':
        return <BannerPromosi data={item.data} />;
      case 'toko':
        return <TokoList toko={item.data} />;
      case 'produk':
        return <ProdukList produk={item.data} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 10,
  },
});

export default BelanjaScreen;
