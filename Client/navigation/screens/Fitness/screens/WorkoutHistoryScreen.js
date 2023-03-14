import { View, SafeAreaView, Text, Dimensions, ScrollView } from 'react-native'
import themeContext from '../../../theme/themeContext';
import { useState, useContext } from 'react';

export default function WorkoutHistoryScreen() {
  const theme = useContext(themeContext) 
  const [results, setResults] = useState([])
  // const { getAllWorkoutNames, isLoading, error } = useGetAllWorkoutNames();
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', maxHeight: screenHeight, alignItems:'center', paddingVertical: 10, backgroundColor: theme.background}}>
        
        <ScrollView style={[styles.scrollView, {borderColor: theme.color}]} showsVerticalScrollIndicator={false} bounces={false} justifyContent={results.length < 1 ? 'center' : 'flex-start'} alignItems={'center'}>

        {/* {error && <Text>{error}</Text>} */}
        {(results.length < 1) && <Text style={{color: theme.color, fontWeight: 'bold'}}>You currently have no Workout History data.</Text>}

        {results && results.map((item) => (
            <TouchableOpacity key={item} onPress={() => {
                navigation.navigate("Workout Plan Information", item)
            }}> 
                <Text style={[styles.testText, {borderColor: theme.color, color: theme.color}]} key={item}>{item}</Text>
            </TouchableOpacity>
        ))}

        </ScrollView>

    </SafeAreaView>
  )
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
  testText: {
      fontSize: 32,
      padding: 5,
      borderRadius: 20,
      margin: 5,
      borderWidth: 1,
      textAlign: 'center',
  },
  scrollView: {
      height: screenHeight * 0.2,
      borderWidth: 2,
      borderRadius: 26,
      paddingHorizontal: 16,
      margin: 10,
      width: screenWidth * 0.9
  },
  textInput: {
      borderWidth: 1,
      padding: 10,
      marginHorizontal: 12,
      flex: 1,
  },
  fab: {
      position: 'absolute',
      margin: 16,
      left: screenWidth * 0.005,
      bottom: screenHeight * 0.005
  },
}