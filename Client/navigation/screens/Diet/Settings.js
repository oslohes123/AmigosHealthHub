import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import NavBar from '../../components/NavBar';

export default function Settings() {

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <NavBar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            '#0C1E3F',
    },
    nav: {
        position: 'absolute',
        top: 700,
        alignSelf: 'center'
    }
})