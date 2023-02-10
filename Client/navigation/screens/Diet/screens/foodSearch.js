import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Search from '../components/Search';

export default function FoodSearch() {

    return (
        <View style={styles.container}>
            <Search />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C1E3F',
        flex: 1,
    }
})