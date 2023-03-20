import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';
const port = process.env.PORT;
const ipAddress = process.env.IP_ADDRESS;
const getUserInfo = async () => {
    const { user } = useAuthContext();
    console.log(`user: ${JSON.stringify(user)}`);
    const { email, token } = user;
    const {logout} = useLogout()
    // console.log(`getUserInfo user : ${JSON.stringify(user)}`);
    const userEmail = user.email;
    // console.log(`full getUserInfo user: ${JSON.stringify(user)}`);
    console.log(`getUserInfo IP_ADDRESS: ${ipAddress} : Port ${port}`);
    console.log(`email in getUserInfo: ${email}`);
    const response = await fetch(
        `http://${ipAddress}:${port}/api/user/getInfo`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
                email: email,
            },
        }
    );
    console.log(JSON.stringify(response));
    if (!response.ok) {
        if(response.status === 401){logout()}
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
