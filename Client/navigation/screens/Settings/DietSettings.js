import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Switch, TextInput} from 'react-native';
// import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../../theme/themeContext';
import GreenButton from '../../components/GreenButton';

export default function DietSettings() {

  const theme = useContext(themeContext)

  const [goal, setGoal] = useState('');

  const handleButtonPress = () => {
    if (goal === '') {
      alert('Please enter new calorie goal');
    } else if (isNaN(goal)) {
        alert('Calorie should be a number');
    } else {
        setGoal('');
        alert('Calorie goal successfully added');
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
          placeholderTextColor={theme.color}
          style={[styles.input, {borderColor: theme.color}, {color: theme.color}]}
          keyboardType="numeric"
          value={goal}
          onChangeText={setGoal}
          clearButtonMode='always'
        />
        <GreenButton text='Set Goal' buttonFunction={handleButtonPress} height={60} width={220}/>
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
    borderRadius: 25,
}
  // CalorieView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginHorizontal: '10%',
  //   marginTop: '10%'
  // },
  // text: {
  //   fontSize: 30
  // },
})

