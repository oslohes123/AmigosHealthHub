
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, Dimensions} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import WordCloud from '../../../cloud.js';

export default function App({navigation}: {navigation: any}) {
 
  const inputScreenButton = () => {
    navigation.navigate('ReviewYourDay')
  } 

  return (
    <View style={styles.container}>
      <Text>Graph</Text>
      <LineChart
      data={line}
      width={screenWidth * 0.9}
      height={220}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, 
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />   

    <Text>WordCloud for the Past Week</Text>
    <WordCloud />
    <StatusBar style="auto" />
      <Button title="Review Your Day" onPress={inputScreenButton}></Button>      
      <StatusBar style="auto" />
    </View>
  );
}
const screenWidth = Dimensions.get("window").width;

const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2, // optional
    },
  ],
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
