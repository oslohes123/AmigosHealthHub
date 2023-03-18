import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';
// const port = process.env['PORT'];
// const ip_address = process.env['IP_ADDRESS'];
const port = process.env.PORT;
const ip_address = process.env.IP_ADDRESS;
const getUserInfo = async () => {
    const { user, dispatch } = useAuthContext();
    const { email, token } = user;
    const {logout} = useLogout()
    // console.log(`getUserInfo user : ${JSON.stringify(user)}`);
    const userEmail = user.email;
    // console.log(`full getUserInfo user: ${JSON.stringify(user)}`);
    console.log(`getUserInfo ip_address: ${ip_address} : Port ${port}`);
    console.log(`email in getUserInfo: ${email}`);
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