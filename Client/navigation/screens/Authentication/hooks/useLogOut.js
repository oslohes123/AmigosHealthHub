import { useAuthContext } from "../context/AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useLogout = () => {



    const logoout = async() => {
        try{
        await AsyncStorage.removeItem('user') //remove jwttoken
        const { state, dispatch } = useAuthContext;
        dispatch({ type: 'LOGOUT' })
        }
        catch(error){
            console.error(error);
        }
    }

    return logoout;

}