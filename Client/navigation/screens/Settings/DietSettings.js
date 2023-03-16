import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Switch, TextInput} from 'react-native';
// import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../../theme/themeContext';
// import GreenButton from '../../components/GreenButton';
import { Button, FAB } from 'react-native-paper';
import { check } from 'prettier';
import { updateCalorieGoal } from '../../../functions/Calories';
import { useAuthContext } from '../Authentication/context/AuthContext';

export default function DietSettings() {

  const theme = useContext(themeContext)

  const [goal, setGoal] = useState('');

  const { user } = useAuthContext();
  const id = user.id;

  const currentDate = new Date().toISOString().split('T')[0];

  const calorieButtonPress = async () => {
    if (goal === '') {
      alert('Error: Please enter new calorie goal');
    } else if (isNaN(goal) || !Number.isInteger(Number(goal)) || goal.includes('.')) {
        alert('Error: Calorie should be a number');
    }
    else if(goal < 1) {
        alert('Error: Calorie goal should be positive');
    }
    else {
        await updateCalorieGoal(id, goal)
        alert('Success: Calorie goal successfully added');
    }
  }
  // const [darkMode, setDarkMode] = useState(false)

  // const [showHeader, setShowHeader] = useState(false)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      {/* <View style={styles.CalorieView}>
        <Text style={[styles.text, {color:theme.color}]}>Calories to goal</Text>
        <Switch
          value={showHeader}
          onValueChange={(value) => {
          setShowHeader(value);
          EventRegister.emit('ChangeHeader', value)
          }}
        />
      </View> */}

      <View>
        <TextInput
          placeholder='Add new calorie goal'
          placeholderTextColor='black'
          style={[styles.input, {borderColor: theme.color}]}
          keyboardType="numeric"
          value={goal}
          onChangeText={setGoal}
          clearButtonMode='always'
        />
        {/* <GreenButton text='Set Goal' buttonFunction={handleButtonPress} height={60} width={220}/> */}
        {/* <F mode='elevated' onPress={handleButtonPress} style={styles.button}>
          Set Goal
        </Button> */}
        <FAB
        //icon='check'
        color='black'
        style={ styles.button}
        label="Set Goal"
        onPress={calorieButtonPress}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#203038',
    flex: 1,
  },
  input: {
    alignSelf: 'center',
    marginTop: '15%',
    fontSize: 16,
    borderWidth: 1,
    padding: '3%',
    width: '70%',
    //borderRadius: 25,
    // borderTopEndRadius: 25,
    borderRadius: 25,
    // borderTopStartRadius: 25,
    marginBottom: '3%',
    //height: 20,
    backgroundColor: 'white',
    color: 'black',
},
  // CalorieView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginHorizontal: '10%',
  //   marginTop: '10%'
  // },
  // text: {
  //   fontSize: 30
  // },
  button: {
    width: 200,
    backgroundColor: '#3eda9b',
    alignSelf: 'center',
  }
})

