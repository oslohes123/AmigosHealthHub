import {
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import hoursSleptGraph from '../Sleep/hoursSleptGraph';
import { useAuthContext } from '../Authentication/context/AuthContext';

//import { useLogout } from "../Authentication/hooks/useLogOut";

export default function DashboardScreen({ navigation }) {
    const { user } = useAuthContext();
    const welcomeMessage = `Welcome to your Dashboard, ${user.firstName} `;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{welcomeMessage}</Text>
            <>{hoursSleptGraph()}</>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
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
        backgroundColor: '#203038',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
