import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import ChangeUserPasswordForm from '../forms/changeUserPasswordsForm';

export default function ChangeUserPasswordScreen({ navigation }) {
    return (
        <>
            {ChangeUserPasswordForm()}
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
