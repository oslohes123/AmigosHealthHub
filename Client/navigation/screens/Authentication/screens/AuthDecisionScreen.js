// import { SafeAreaView, View, Text, Button } from 'react-native'
// import React from 'react'

// export default function AuthDecisionScreen({ navigation }) {
//     return (
//         <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ fontSize: 32, fontWeight: "bold", padding: 40, }}>Welcome Screen</Text>
//             <View style={{ flex: 1, justifyContent: 'flex-end', margin: 20 }}>
//                 <Button title={"Log into account"} onPress={() => {
//                     console.log("go to log in screen.");
//                     navigation.navigate("Log In");
//                 }} />
//                 <Button title={"Sign up for account"} onPress={() => {
//                     console.log("go to sign up screen.");
//                     navigation.navigate("Sign Up");
//                 }} />
//             </View>
//         </SafeAreaView>
//     )
// }

import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

export default function AuthDecisionScreen({ navigation }) {
    return (
        // <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     {/* <Text style={{ fontSize: 32, fontWeight: "bold", padding: 40, }}>Welcome Screen</Text> */}
        //     <View style={styles.animation}>
        //    <LottieView 
        //      source={require('../../../../assets/animation.json')} 
        //      autoPlay 
        //      loop={true}
        //      speed={2}
        //    />
        //    <Text style={styles.text}>HEALTH HUB</Text>
        //  </View>
        //     <View style={{ flex: 1, justifyContent: 'flex-end', margin: 20 }}>
        //         <Button title={"Log into account"} onPress={() => {
        //             console.log("go to log in screen.");
        //             navigation.navigate("Log In");
        //         }} />
        //         <Button title={"Sign up for account"} onPress={() => {
        //             console.log("go to sign up screen.");
        //             navigation.navigate("Sign Up");
        //         }} />
        //     </View>
        // </SafeAreaView>
        <View style={styles.container}>
            <View style={styles.animation}>
                <Text style={styles.text}>HEALTH HUB</Text>
                <LottieView 
                    source={require('../../../../assets/animation.json')} 
                    autoPlay 
                    loop={true}
                    speed={1.5}
                />
                <View style={{marginTop:'100%'}}>
                    <Button title={"Log into account"} onPress={() => {
                        console.log("go to log in screen.");
                        navigation.navigate("Log In");
                    }} />
                    <Button title={"Sign up for account"} onPress={() => {
                        console.log("go to sign up screen.");
                        navigation.navigate("Sign Up");
                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
      fontSize: 40,
      fontWeight: 'bold',
      marginTop: '10%'
    },
    animation: {
      flex: 1,
      alignItems: 'center', 
      backgroundColor: 'white',
    }
  })