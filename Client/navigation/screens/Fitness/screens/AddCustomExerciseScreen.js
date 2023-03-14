import { SafeAreaView, View, Text, Dimensions, TextInput } from 'react-native'
import { useState, useContext, useEffect } from 'react';
import themeContext from '../../../theme/themeContext';
import { FAB, Snackbar } from 'react-native-paper';
import { useAddExerciseToExercises } from '../hooks/useAddExerciseToExercises';

export default function AddCustomExerciseScreen({ navigation }) {
  const theme = useContext(themeContext)
  const { addExerciseToExercises } = useAddExerciseToExercises()

  const [customName, setCustomName] = useState('')
  const [customType, setCustomType] = useState('')
  const [customMuscle, setCustomMuscle] = useState('')
  const [customDifficulty, setCustomDifficulty] = useState('')
  const [customInstructions, setCustomInstructions] = useState('')
  const [customEquipment, setCustomEquipment] = useState('')

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarResponse, setSnackbarResponse] = useState('');

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-evenly', maxHeight: screenHeight, alignItems:'center', paddingVertical: 20, backgroundColor: theme.background}}>

        <Text style={{color: theme.color, fontWeight: 'bold', fontSize: 16, paddingBottom: 5}}>Enter exercise details below</Text>

        <View style={{flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center', color: theme.color}}>Exercise Name:</Text>
          <TextInput
            style={{color: theme.color, width: screenWidth * 0.5, borderColor: theme.color, marginVertical: 10, paddingVertical: 8}}
            placeholder={"Enter Exercise Name"}
            textAlign={"center"}
            onChangeText={(value) => {setCustomName(value)}}
            value={customName}
            placeholderTextColor={theme.color}
            clearButtonMode={"always"}
            borderColor={theme.color}
            borderWidth={1}
            borderRadius={10}
            />
        </View>

        <View style={{flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center', color: theme.color}}>Exercise Type:</Text>
          <TextInput
            style={{color: theme.color, width: screenWidth * 0.5, borderColor: theme.color, marginVertical: 10, paddingVertical: 8}}
            placeholder={"Enter Exercise Type"}
            textAlign={"center"}
            onChangeText={(value) => {setCustomType(value)}}
            value={customType}
            placeholderTextColor={theme.color}
            clearButtonMode={"always"}
            borderColor={theme.color}
            borderWidth={1}
            borderRadius={10}
            />
        </View>

        <View style={{flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center', color: theme.color}}>Exercise Muscle:</Text>
          <TextInput
            style={{color: theme.color, width: screenWidth * 0.5, borderColor: theme.color, marginVertical: 10, paddingVertical: 8}}
            placeholder={"Enter Exercise Muscle"}
            textAlign={"center"}
            onChangeText={(value) => {setCustomMuscle(value)}}
            value={customMuscle}
            placeholderTextColor={theme.color}
            clearButtonMode={"always"}
            borderColor={theme.color}
            borderWidth={1}
            borderRadius={10}
            />
        </View>

        <View style={{flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center', color: theme.color}}>Exercise Difficulty:</Text>
          <TextInput
            style={{color: theme.color, width: screenWidth * 0.5, borderColor: theme.color, marginVertical: 10, paddingVertical: 8}}
            placeholder={"Enter Exercise Difficulty"}
            textAlign={"center"}
            onChangeText={(value) => {setCustomDifficulty(value)}}
            value={customDifficulty}
            placeholderTextColor={theme.color}
            clearButtonMode={"always"}
            borderColor={theme.color}
            borderWidth={1}
            borderRadius={10}
            />
        </View>

        <View style={{flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center', color: theme.color}}>Exercise Equipment:</Text>
          <TextInput
            style={{color: theme.color, width: screenWidth * 0.5, borderColor: theme.color, marginVertical: 10, paddingVertical: 8}}
            placeholder={"Enter Exercise Equipment"}
            textAlign={"center"}
            onChangeText={(value) => {setCustomEquipment(value)}}
            value={customEquipment}
            placeholderTextColor={theme.color}
            clearButtonMode={"always"}
            borderColor={theme.color}
            borderWidth={1}
            borderRadius={10}
            />
        </View>

        <View style={{width: screenWidth * 0.9, height: screenHeight * 0.25, paddingVertical: 5}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center', color: theme.color}}>Exercise Instructions:</Text>
          <TextInput
            style={{color: theme.color, width: screenWidth * 0.5, width: screenWidth * 0.9, maxHeight: screenHeight * 0.2, borderColor: theme.color, margin: 10, padding: 10, alignSelf: 'center'}}
            placeholder={"Enter Exercise Instructions"}
            textAlign={"center"}
            onChangeText={(value) => {setCustomInstructions(value)}}
            value={customInstructions}
            placeholderTextColor={theme.color}
            clearButtonMode={"always"}
            borderColor={theme.color}
            borderWidth={1}
            borderRadius={10}
            multiline={true}
            />
        </View>

        <FAB
          icon="check"
          style={styles.fab}
          label="Save Exercise"
          onPress={() => {
            //Save exercise to exercises table
            if (customName && customType && customMuscle && customDifficulty && customInstructions != null && customEquipment) {
              const addResponse = addExerciseToExercises(customType, customName, customMuscle, customDifficulty, customInstructions, customEquipment)
              if (addResponse) {
                navigation.pop()
              } else {
                setSnackbarResponse("Could not save exercise.")
              }
            } else {
              setSnackbarResponse("Fields left empty.")
              setSnackbarVisible(true)
            }
          }}
          />

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(!snackbarVisible)}
            action={{
                label: 'Close',
                onPress: () => {
                    setSnackbarVisible(!snackbarVisible)
                },
            }}
            duration={3000}
            >
            {snackbarResponse}
          </Snackbar>   

    </SafeAreaView>
  )
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = {
  fab: {
    width: screenWidth * 0.9,
    marginTop: 10
  }
}