import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { deleteAccountForm } from '../forms/deleteAccountForm';

export default function ChangeUserPasswordScreen({ navigation }) {
    return (
        <>
            {deleteAccountForm()}
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
