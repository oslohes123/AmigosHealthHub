import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
// const dotenv = require("dotenv");
// dotenv.config();
const port = process.env.PORT;

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null) //


    const signup = async (email, firstName, lastName, age, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://10.0.2.2:3030/:${port}/api/user/sign_up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, firstName, lastName, age, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            const { dispatch } = useAuthContext()
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}