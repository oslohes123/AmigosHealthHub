import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
// const dotenv = require("dotenv");
// dotenv.config();
const port = process.env.PORT;

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null) //


    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://10.0.2.2:3030/:${port}/api/user/login`, {
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
            localStorage.setItem('user', JSON.stringify(json))
            console.log(json)

            const { dispatch } = useAuthContext()
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}