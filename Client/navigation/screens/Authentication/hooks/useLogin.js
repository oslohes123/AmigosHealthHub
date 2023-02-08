import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const dotenv = require("dotenv");
// dotenv.config();
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null) //


    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://${ip_address}:${port}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            try{
                await AsyncStorage.setItem('user', JSON.stringify(json))
            console.log(json)

            const { dispatch } = useAuthContext()
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
            }
            catch(error){
                console.error(error);
            }
        }
    }

    return { login, isLoading, error }
}