import {AuthContext} from '../context/AuthContext'
import { useContext } from 'react'

/**
 * Allows components to consume AuthContext
 * Returns state and dispatch of AuthContext
 */
export const useAuthContext = () => {
    const stateAndDispatch = useContext(AuthContext);

    //stateAndDispatch are null when 
    //AuthContext is used outside of the wanted scope. So throw error
    if(!stateAndDispatch){
        throw Error("AuthContext is being used outside its intended scope.")
    }

    return stateAndDispatch;
}