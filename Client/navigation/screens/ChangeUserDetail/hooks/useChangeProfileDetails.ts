import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
// import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];

export const useChangeProfileDetails = () => {
    console.log(`port: ${port}`);
    const [error, setError] = useState<JSON | null | boolean>(null);
    const [isLoading, setIsLoading] = useState<Boolean | null>(null);
    const { dispatch, user } = useAuthContext();
    console.log('In changeProfile');

    // const changeStats = async (a_firstName:string, a_lastName:string, a_newEmail:string, a_age:number, a_password:string) => {
    const changeStats = async (
        a_firstName: string,
        a_lastName: string,
        a_newEmail: string,
        a_age: number
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
                (await AsyncStorage.getItem('user')) as string
            );
            console.log(`In useChangeProfileDetails, email: ${email}, token:${token}`);
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
                setIsLoading(false);
                setError(json.mssg);
                console.log(error);
            }
            if (response.ok) {
                try {
                    //Log the user out if change details is successful

                    setIsLoading(false);
                    dispatch({ type: 'LOGOUT'});
                } catch (error) {
                    setError(true);
                    setIsLoading(false);
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    return { changeStats, isLoading, error };
    // const response = await fetch(`http://192.168.0.17:3001/api/user/sign_up`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({"email":"sadasds23ad@gmail.com","firstName":"asdasdsad","lastName":"asdasdsadsa","age":"23","password":"Password123!"})
    // })
};
