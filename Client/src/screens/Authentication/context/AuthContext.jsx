/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, useContext, useEffect, useReducer, React,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;
const serverURL = process.env.URL;
export const AuthContext = createContext();
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
let checkInitialTokenRoute;
if (usingDeployedServer) {
  checkInitialTokenRoute = `${serverURL}/api/user/checkInitialToken`;
} else {
  checkInitialTokenRoute = `http://${ipAddress}:${port}/api/user/checkInitialToken`;
}

/**
 *
 * @param {any} state prior state to when the dispatch fn is called
 * @param {any} action argument to dispatch
 */
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const useAuthContext = () => {
  const stateAndDispatch = useContext(AuthContext);

  // stateAndDispatch are null when
  // AuthContext is used outside of the wanted scope. So throw error
  if (!stateAndDispatch) {
    throw Error('AuthContext is being used outside its intended scope.');
  }
  // console.log(`state and dispatch : ${stateAndDispatch}`);
  return stateAndDispatch;
};
export function AuthContextProvider({ children }) {
  //
  //  initial value: user:null

  //   dispatch({type: '', payload:''}) to update state, the argument of the disptch fn is known as
  //   an action

  //   When dispatch is called, the authReducer is called which passes the action and uses that to
  //   update the state
  // const { logout } = useLogout();
  const [state, dispatch] = useReducer(authReducer, { user: null });

  console.log(`${state.user}`);
  useEffect(() => {
    async function getItem() {
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      console.log(`user: ${JSON.stringify(user)}`);
      if (user) {
        // console.log(`token: ${user.token}`);
        console.log('IN AUTHCONTEXTPROVIDER');
        const { token } = user;
        const response = await fetch(
          checkInitialTokenRoute,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: token,
            },
          },
        );
        console.log(`response ln 90: ${JSON.stringify(response)}`);
        // if token exists, then update user state with the token
        if (response.ok) {
          dispatch({ type: 'LOGIN', payload: user });
        } else {
          await AsyncStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
      }
    }
    getItem();
  }, []);
  // At the very beginning of app, check if there exists
  // 'user' in AsyncStorage, if so, set user state to

  return (
  // All children can use state and dispatch
  // <AuthContext.Provider value={useAuthContext()}>
  //     {children}
  // </AuthContext.Provider>

    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
