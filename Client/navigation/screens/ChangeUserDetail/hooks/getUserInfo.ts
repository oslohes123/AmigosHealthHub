import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];

const getUserInfo = async () => {
    const { user, dispatch } = useAuthContext();
    const { email, token } = JSON.parse(
        (await AsyncStorage.getItem('user')) as string
    );
    const response = await fetch(
        `http://${ip_address}:${port}/api/user/getInfo`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email: email })
        }
    );
    if (!response.ok) {
        throw new Error(
            `Failed to get user info with email ${email}, status: ${response.status}`
        );
    }
    const responseJSON = await response.json();
    console.log(`response json: ${JSON.stringify(responseJSON)}`);
    console.log(JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: responseJSON });
};

module.exports.getUserInfo = getUserInfo;
