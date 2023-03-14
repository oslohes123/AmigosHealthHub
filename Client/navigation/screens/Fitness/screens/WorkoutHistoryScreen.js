import { SafeAreaView, Text, Dimensions } from 'react-native'
import themeContext from '../../../theme/themeContext';
import { useContext } from 'react';

export default function WorkoutHistoryScreen() {
  const theme = useContext(themeContext) 
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', maxHeight: screenHeight, alignItems:'center', paddingVertical: 10, backgroundColor: theme.background}}>
      <Text style={{color: theme.color}}>Workout History screen placeholder text</Text>
    </SafeAreaView>
  )
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;