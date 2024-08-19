import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ProdukList = ({ produk }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={produk}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    productItem: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
});

export default ProdukList;
