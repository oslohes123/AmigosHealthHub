import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

// import { formikChangeUserPasswordForm } from '../forms/changeUserPasswordForm';

export default function ChangeUserPasswordScreen({ navigation }) {
    return (
        <>
            {/* {formikChangePasswordDetailsForm()} */}
            <SafeAreaView
                style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text> Hello</Text>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
