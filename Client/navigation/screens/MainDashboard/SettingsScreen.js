import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function SettingsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('Change details pressed.');
                    navigation.navigate('ChangeUserDetails');
                }}
            >
                <Text style={styles.buttonText}>Change details</Text>
                <Ionicons name="ios-arrow-forward" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('Change password Pressed');
                    navigation.navigate('ChangeUserDetails');
                }}
            >
                <Text style={styles.buttonText}>Change password</Text>
                <Ionicons name="ios-arrow-forward" size={16} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'flex-start',
        fontSize: 32,
        fontWeight: 'bold',
        padding: 15
    },
    container: {
        backgroundColor: '#22343C',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#2A3C44',
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
