import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../../Authentication/context/AuthContext';
const port = process.env['PORT'];
const ipAddress = process.env['ipAddress'];
import { useLogout } from '../../Authentication/hooks/useLogOut';



export const deleteAccountWrapper = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch, user } = useAuthContext();
    const {logout} = useLogout();
    //Provide just the password, email is taken from the 'user' context
    
    const deleteAccount = async (password) => {
        setIsLoading(true);
        setError(null);
        console.log('In deleteAccount');

        try {
            const email = user.email;
            
            const {token } = JSON.parse(
                (await AsyncStorage.getItem('user'))
            );
            console.log(`In deleteAccount, email: ${email}, token:${token}`);
            console.log(`Delete Account: ${ipAddress} : Port ${port}`);
            const response = await fetch(
                `http://${ipAddress}:${port}/api/user/changeProfileDetails/deleteAccount`,
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


