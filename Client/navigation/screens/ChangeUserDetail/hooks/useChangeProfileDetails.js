import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
// import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';
import { useLogout } from '../../Authentication/hooks/useLogOut';
// const port = process.env['PORT'];
// const ip_address = process.env['IP_ADDRESS'];
const port = process.env.PORT;
const ip_address = process.env.IP_ADDRESS;
console.log(`process.env: ${JSON.stringify(process.env)}`)
export const useChangeProfileDetails = () => {
    console.log(`port: ${port}`);
    const{logout} = useLogout();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch, user } = useAuthContext();
    console.log('In changeProfile');

    // const changeStats = async (a_firstName:string, a_lastName:string, a_newEmail:string, a_age:number, a_password:string) => {
    const changeStats = async (
        a_firstName,
        a_lastName,
        a_newEmail,
        a_age
    ) => {
        setIsLoading(true);
        setError(null);
        console.log('In changeStats');
        console.log(
            `body Of changeStats: ${JSON.stringify({
                a_firstName,
                a_lastName,
                a_newEmail,
                a_age
            })}`
        );

        try {
            //AsyncStorage contains: firstName, email and token
            const email = user.email;
            
            const {token } = JSON.parse(
                (await AsyncStorage.getItem('user'))
            );
            console.log(`user: ${JSON.stringify(user)}`)
            console.log(`In useChangeProfileDetails, email: ${email}, token:${token}`);
            console.log(`In useChangeProfileDetails : ${ip_address} : Port ${port}`);
            
            const response = await fetch(
                `http://${ip_address}:${port}/api/user/changeProfileDetails/stats`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token
                    },
                    body: JSON.stringify({
                        newEmail: a_newEmail,
                        firstName: a_firstName,
                        lastName: a_lastName,
                        age: a_age,
                        prevEmail: email
                    })
                }
            );

            const json = await response.json();

            if (!response.ok) {
                if(response.status === 401){logout()}
                setIsLoading(false);
                setError(json.mssg);
                console.log(error);
            }
            if (response.ok) {
                try {
                    setIsLoading(false);
                    logout();
                   
            
                } catch (error) {
                    setError(true);
                    setIsLoading(false);
                    console.error(error);
                }
            }
        } catch (error) {
            console.log("In useChangeProfileDetails")
            console.error(error);
        }
    };
    return { changeStats, isLoading, error };
};