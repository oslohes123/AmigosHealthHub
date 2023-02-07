import { createContext, useReducer } from "react";


export const AuthContext = createContext();

/**
 * 
 * @param {any} state prior state to when the dispatch fn is called
 * @param {any} action argument to dispatch
 */
export const authReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return {
                user: action.payload
            }

        case 'LOGOUT':
            return {
                user:null
            }
        default:
            return state
    }

}
/**
 * Creating provider to wrap children who need the values provided
 */
export const AuthContextProvider = ({children}) => {

    // 
    //  initial value: user:null
     
    //   dispatch({type: '', payload:''}) to update state, the argument of the disptch fn is known as
    //   an action
      
    //   When dispatch is called, the authReducer is called which passes the action and uses that to 
    //   update the state
     
    const [state, dispatch] = useReducer(authReducer, {
        user:null
    })

    console.log(`AuthContext state: ${state}`);

    return (
        //All children can use state and dispatch
        <AuthContext.Provider value = {{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}