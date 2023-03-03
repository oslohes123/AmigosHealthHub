import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';

export default function App({navigation}: {navigation: any}) {
 
  const inputScreenButton = () => {
    navigation.navigate('ReviewYourDay')
  } 
  const outputScreenButton = () => {
    navigation.navigate('ReviewYourPast')
  } 
  return (
    <View style={styles.container}>
      <Button title="Review Your Day" onPress={inputScreenButton}></Button>      
      <Button title="Review Your Past" onPress={outputScreenButton}></Button>      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
