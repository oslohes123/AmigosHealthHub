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
                    navigation.navigate('Change User Details');
                }}
            >
                <Text style={styles.buttonText}>Change details</Text>
                <Ionicons name="ios-arrow-forward" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('Change password Pressed');
                    navigation.navigate('Change User Password');
                }}
            >
                <Text style={styles.buttonText}>Change password</Text>
                <Ionicons name="ios-arrow-forward" size={32} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('Delete account');
                    navigation.navigate('Delete Account');
                }}
            >
                <Text style={styles.buttonText}>Delete Account</Text>
                <Ionicons name="ios-arrow-forward" size={32} color="black" />
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
        flexDirection: 'row', 
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        marginTop: '9%',
        backgroundColor: '#3eda9b',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 30,
        marginLeft: '5%'
    }
});
