import { useAuthContext } from "../context/AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage';


// export const useLogOut = () => {
//     const {user,dispatch } = useAuthContext();
//     async function logOut(){
//         try{
//             console.log('In logOut function')
//             await AsyncStorage.removeItem('user') 
            
//             dispatch({ type: 'LOGOUT' })
//             console.log(user)
//         }
//         catch(error){
//             console.error(error);
//         }
//     }
//     logOut();
// }

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = async() => {
    // remove user from storage
    console.log('In logOut function')
    await AsyncStorage.removeItem('user') 

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}

