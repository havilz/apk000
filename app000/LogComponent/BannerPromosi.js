import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const BannerPromosi = ({ data }) => {
    if (!data || !Array.isArray(data)) {
        return <Text>Data tidak tersedia</Text>;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
                <View style={styles.bannerItem}>
                    <Image source={{ uri: item.image }} style={styles.bannerImage} />
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    bannerItem: {
        marginBottom: 10,
    },
    bannerImage: {
        width: '100%',
        height: 150,
    },
    bannerTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default BannerPromosi;
