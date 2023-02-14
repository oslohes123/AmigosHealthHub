import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];

const getUserInfo = async () => {
    const {user, dispatch } = useAuthContext();
    const { email, token } = JSON.parse(
        (await AsyncStorage.getItem('user')) as string
    );
    console.log(`getUserInfo : ${email}`)
    console.log(`full getUserInfo: ${JSON.stringify(getUserInfo)}`)
    console.log(`getUserInfo user : ${user.user.email}`)
     const userEmail= user.user.email
    console.log(`full getUserInfo user: ${JSON.stringify(user)}`)
    const response = await fetch(
        `http://${ip_address}:${port}/api/user/getInfo`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({email: userEmail})
        }
    );
    if (!response.ok) {
        throw new Error(
            `Failed to get user info with email ${email}, status: ${response.status}`
        );
    }
    const responseJSON = await response.json();
    // console.log(`response json: ${JSON.stringify(responseJSON)}`);
    // console.log(JSON.stringify(user));
    // AsyncStorage.setItem('user',JSON.stringify(responseJSON))
    return responseJSON;
};

module.exports.getUserInfo = getUserInfo;
