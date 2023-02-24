import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];




export const deleteAccountWrapper = () => {
    const [error, setError] = useState<JSON | null | boolean>(null);
    const [isLoading, setIsLoading] = useState<Boolean | null>(null);
    const { dispatch, user } = useAuthContext();
    
    //Provide just the password, email is taken from the 'user' context
    
    const deleteAccount = async (password: string) => {
        setIsLoading(true);
        setError(null);
        console.log('In deleteAccount');

        try {
            const email = user.email;
            
            const {token } = JSON.parse(
                (await AsyncStorage.getItem('user')) as string
            );
            console.log(`In deleteAccount, email: ${email}, token:${token}`);
            const response = await fetch(
                `http://${ip_address}:${port}/api/user/deleteAccount`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token
                    },
                    body: JSON.stringify({
                        email:email,
                        password: password
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
                    setIsLoading(false);
                    dispatch({ type: 'LOGOUT'});
                } 
                catch (error) {
                    setError(true);
                    setIsLoading(false);
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    return { deleteAccount, isLoading, error };
};


