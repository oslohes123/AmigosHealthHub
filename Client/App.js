import MainContainer from './navigation/MainContainer';
import {AuthContextProvider} from './navigation/screens/Authentication/context/AuthContext'
export default function App() {
  return (

    <AuthContextProvider>
    <MainContainer />
    </AuthContextProvider>
  );
}