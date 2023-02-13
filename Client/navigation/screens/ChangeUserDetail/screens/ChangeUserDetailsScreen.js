import { Button, SafeAreaView, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChangeUserDetailsScreen({ navigation }) {
    return (
        <>
            {formikLoginForm()}
            <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Button title={"Sign Up"} onPress={() => {
                    console.log("go to sign up screen.");
                    navigation.navigate("Sign Up");
                }} />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
