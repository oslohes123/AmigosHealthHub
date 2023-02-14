import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { formikChangeUserPasswordForm } from '../forms/changeUserPasswordsForm';

export default function ChangeUserPasswordScreen({ navigation }) {
    return (
        <>
            {formikChangeUserPasswordForm()}
            <SafeAreaView
                style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            ></SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
