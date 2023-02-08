import { useAuthContext } from "./useAuthContext"
export const useLogout = () => {



    const logoout = () => {
        localStorage.remove('user') //remove jwttoken
        const {state, dispatch} = useAuthContext;
        dispatch({type:'LOGOUT'})
    }

    return logoout;

}