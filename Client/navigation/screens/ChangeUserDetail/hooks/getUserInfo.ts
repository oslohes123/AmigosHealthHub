import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];

const getUserInfo = async () => {
    const { user, dispatch } = useAuthContext();
    const { email, token } = user;

    // console.log(`getUserInfo user : ${JSON.stringify(user)}`);
    const userEmail = user.email;
    // console.log(`full getUserInfo user: ${JSON.stringify(user)}`);
    const response = await fetch(
        `http://${ip_address}:${port}/api/user/getInfo`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
                email: email,
            },
        }
    );
    if (!response.ok) {
        console.log(`response of getUserInfo: ${JSON.stringify(response)}`);
        return {
            user:{
                firstName: "Loading...",
                lastName: "Loading...",
                email: "Loading...",
                age:"Loading..."
            }
        }
    } else if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    }
};

module.exports.getUserInfo = getUserInfo;
