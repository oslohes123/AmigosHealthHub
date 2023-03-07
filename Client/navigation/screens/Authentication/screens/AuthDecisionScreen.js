import { SafeAreaView, View, Text, Button } from 'react-native'
import React from 'react'

export default function AuthDecisionScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", padding: 40, }}>Welcome Screen</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end', margin: 20 }}>
                <Button title={"Log into account"} onPress={() => {
                    console.log("go to log in screen.");
                    navigation.navigate("Log In");
                }} />
                <Button title={"Sign up for account"} onPress={() => {
                    console.log("go to sign up screen.");
                    navigation.navigate("Sign Up");
                }} />
            </View>
        </SafeAreaView>
    )
}