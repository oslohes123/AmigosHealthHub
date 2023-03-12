import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useAuthContext } from '../../Authentication/context/AuthContext';
import { useLogout } from '../../Authentication/hooks/useLogOut';
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];

const getSleep = async () => {
    const { user, dispatch } = useAuthContext();
    const { email, token, id } = user;

    const today = moment.locale();
    const sevenDaysAgo = moment().subtract(1, 'days').calendar();

    console.log(`full getSleep user: ${JSON.stringify(user)}`);
    console.log(`getUserInfo ip_address: ${ip_address} : Port ${port}`);
    console.log(`id in getUserInfo: ${id}`);
    console.log(`Time from ${today} to ${sevenDaysAgo}  `);
    const response = await fetch(
        `http://${ip_address}:${port}/api/user/sleep/get`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify({
                userID: id,
                startDate: today,
                endDate: sevenDaysAgo
            })
        }
    );
    console.log(`response of getSleep: ${JSON.stringify(response)}`);
    if (!response.ok) {
        console.log('Error in get sleep');
        return { error: 'error' };
    } else if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    }
};

module.exports.getSleep = getSleep();
