import {
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import GraphWidget from './graphWidget';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from '../Authentication/context/AuthContext';
import widget from '../../components/widget';

//import { useLogout } from "../Authentication/hooks/useLogOut";

export default function DashboardScreen({ navigation }) {
    const { user } = useAuthContext();
    const welcomeMessage = `Welcome to your Dashboard, ${user.firstName} `;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{welcomeMessage}</Text>
            <>{GraphWidget()}</>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        padding: 15
    },
    mainImage: {
        width: 120,
        height: 120
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
