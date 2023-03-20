import { SafeAreaView } from 'react-native';

import DeleteAccountForm from '../forms/deleteAccountForm';

export default function ChangeUserPasswordScreen({ navigation }) {
    return (
        <>
            {DeleteAccountForm()}
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
