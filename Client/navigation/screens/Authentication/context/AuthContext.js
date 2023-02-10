import { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

/**
 * 
 * @param {any} state prior state to when the dispatch fn is called
 * @param {any} action argument to dispatch
 */
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }

        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }

}

export const useAuthContext = () => {
    const stateAndDispatch = useContext(AuthContext);

    //stateAndDispatch are null when 
    //AuthContext is used outside of the wanted scope. So throw error
    if (!stateAndDispatch) {
        throw Error("AuthContext is being used outside its intended scope.")
    }
    // console.log(`state and dispatch : ${stateAndDispatch}`);
    return stateAndDispatch;
}

// const useEffectCheckToken = () => {
//     useEffect(()=>{

//         async function getItem(){
//        const token =  JSON.parse(await AsyncStorage.getItem('user'))
       
//         console.log(`token: ${token}`);
//         //if token exists, then update user state
//         if(token){
//             dispatch({type:'LOGIN', payload:token})
//         }
//         }
//         getItem()
//     }, [])
// }
/**
 * Creating provider to wrap children who need the values provided
 */
export const AuthContextProvider = ({ children }) => {

    // 
    //  initial value: user:null

    //   dispatch({type: '', payload:''}) to update state, the argument of the disptch fn is known as
    //   an action

    //   When dispatch is called, the authReducer is called which passes the action and uses that to 
    //   update the state

    const [state, dispatch] = useReducer(authReducer, { user: null })

    console.log(`${state.user}`);
    useEffect(()=>{

        async function getItem(){
       const token =  JSON.parse(await AsyncStorage.getItem('user'))
       
        console.log(`token: ${token}`);
        //if token exists, then update user state
        if(token){
            dispatch({type:'LOGIN', payload:token})
        }
        }
        getItem()
    }, [])
    //At the very beginning of app, check if there exists 
    // 'user' in AsyncStorage, if so, set user state to
    
    return (
        //All children can use state and dispatch
        // <AuthContext.Provider value={useAuthContext()}>
        //     {children}
        // </AuthContext.Provider>

        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}