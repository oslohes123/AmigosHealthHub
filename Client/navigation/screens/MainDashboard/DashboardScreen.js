import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import react from "react";
import { useAuthContext } from '../Authentication/context/AuthContext';
import { useLogout } from '../Authentication/hooks/useLogOut';

export default function DashboardScreen({ navigation }) {

    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }
    
    const { user } = useAuthContext();
    const welcomeMessage = `Welcome to your Dashboard,${user.firstName} `;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} onLongPress={() => {
                console.log("The user wants to see info about the dashboard.")
            }}>
                <Text>Welcome to your Dashboard,${user.firstName}</Text>
            </Text>
            <View style={styles.settings}>
                <Ionicons name={'cog'} size={50} colour={'white'} onPress={() => navigation.navigate("Settings")}></Ionicons>
            </View>
            <Button title = {"LogOut"} onPress={handleClick}/>
            <View style={styles.blankSpace}>
                {/* <Image style={styles.mainImage} source={require('assets/favicon.png')} /> */}
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    title: {
        alignSelf: 'flex-start',
        fontSize: 32,
        fontWeight: "bold",
        padding: 15,
    },
    settings: {
        flex: 1,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 10,
        right: 10,
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
    },
    settings: {
        flex: 1,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 10,
        right: 10,
    },
});