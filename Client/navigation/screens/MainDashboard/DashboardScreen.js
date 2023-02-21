import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import widget from '../../components/widget';

export default function DashboardScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see info about the dashboard.")
            }}>
                DASHBOARD
            </Text>
                {widget({ widgetText: 'Sleep', widgetColor: '#01007c', buttonFunction: () => {navigation.navigate('Sleep')}})}
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        padding: 40,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});