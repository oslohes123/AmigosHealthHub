import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];
import { useLogout } from '../../Authentication/hooks/useLogOut';



export const deleteAccountWrapper = () => {
    const [error, setError] = useState<JSON | null | boolean>(null);
    const [isLoading, setIsLoading] = useState<Boolean | null>(null);
    const { dispatch, user } = useAuthContext();
    const {logout} = useLogout();
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
            console.log(`Delete Account: ${ip_address} : Port ${port}`);
            const response = await fetch(
                `http://${ip_address}:${port}/api/user/changeProfileDetails/deleteAccount`,
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
                if(response.status === 401){logout()}
               
            }
            if (response.ok) {
                try {
                    setIsLoading(false);
                    logout();
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


