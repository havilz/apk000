import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" />
                <TouchableOpacity style={styles.searchIconButton}>
                    <Image source={require('../assets/icons/searchicon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                {/* Tombol keranjang */}
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('../assets/icons/carticon.png')} style={styles.icon} />
                </TouchableOpacity>
                {/* Tombol notifikasi */}
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('../assets/icons/notifications-icon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 4, // Untuk bayangan di Android
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingLeft: 40,
    },
    searchIconButton: {
        position: 'absolute',
        left: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 20,
    },
    icon: {
        width: 24,
        height: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10, // Jarak antara judul dan ikon
    },
});

export default Header;
