import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from 'react';
import { useAuthContext } from '../../Authentication/context/AuthContext'
const port = process.env['PORT'];
const ip_address = process.env['IP_ADDRESS'];


export const useChangeProfilePassword = () => {
    console.log(`port: ${port}`)
    const [error, setError] = useState<JSON|null|boolean>(null)
    const [isLoading, setIsLoading] = useState<Boolean|null>(null) 
    const { dispatch, user } = useAuthContext()
    console.log("In useSignUp");
    
    const changePassword = async (a_Email:string, old_password:string , new_password:string) => {
        setIsLoading(true)
        setError(null)
        console.log("In changePassword");
        console.log(`body Of changePassword: ${JSON.stringify({ a_Email, old_password, new_password})}`)

        try{
            //AsyncStorage contains: firstName, email and token 
             const {email, token}= JSON.parse(await AsyncStorage.getItem('user') as string)
             const response = await fetch(`http://${ip_address}:${port}/api/user/changeProfileDetails/password`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
             },
                body: JSON.stringify({ email:a_Email, oldPassword:old_password, newPassword:new_password})
            })


            const json = await response.json();
      
            if (!response.ok) {
                setIsLoading(false)
                setError(json.mssg)
                console.log(error)
            }
            if (response.ok) {
                try{
               //Log the user out if change details is successful
    
                setIsLoading(false)
                dispatch({ type: 'LOGOUT'})
                }
                catch(error){
                    setError(true);
                    setIsLoading(false);
                    console.error(error);
                }
            }
        }
    
        catch(error){
            console.error(error);
        }
       
       
        }
        return { changePassword, isLoading, error }
        // const response = await fetch(`http://192.168.0.17:3001/api/user/sign_up`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({"email":"sadasds23ad@gmail.com","firstName":"asdasdsad","lastName":"asdasdsadsa","age":"23","password":"Password123!"})
        // })

        
}