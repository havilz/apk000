import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const TokoList = ({ toko }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Brands</Text>
            <ScrollView horizontal>
                {toko.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.tokoItem}>
                        <Text style={styles.tokoName}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tokoItem: {
        marginRight: 15,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    tokoName: {
        fontSize: 16,
    },
});

export default TokoList;
