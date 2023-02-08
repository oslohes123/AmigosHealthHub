import MainContainer from './navigation/MainContainer';
import AuthContainer from './navigation/AuthContainer';
import { AuthContextProvider } from './navigation/screens/Authentication/context/AuthContext';
import { useAuthContext } from './navigation/screens/Authentication/context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Screen names
const mainContainerName = "Main app"
const authContainerName = "Auth screens"

function App() {
  const { user } = useAuthContext();
  console.log(`Log state from app: ${user}`);
  return (
    user === null ? <AuthContainer /> : <MainContainer />
  )
}

export default () => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
};
