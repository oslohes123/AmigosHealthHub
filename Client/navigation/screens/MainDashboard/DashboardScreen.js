import { StatusBar } from 'expo-status-bar';
import react from "react";
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import widget from '../../components/widget';

export default function DashboardScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see info about the dashboard.")
            }}>
                DASHBOARD
            </Text>
            <View style={styles.blankSpace}>
                {/* <Image style={styles.mainImage} source={require('assets/favicon.png')} /> */}
                {widget({})}
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    blankSpace: {
        flex: 1,
        justifyContent: 'center'
    },
    mainImage: {
        width: 120,
        height: 120,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
});