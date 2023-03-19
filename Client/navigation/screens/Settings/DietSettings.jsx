/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { useState, useContext } from 'react';
import {
  View, StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { FAB } from 'react-native-paper';
import themeContext from '../../theme/themeContext';
import { updateCalorieGoal } from '../../../functions/Calories';
import { useAuthContext } from '../Authentication/context/AuthContext';

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
    marginBottom: '3%',
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    width: 200,
    backgroundColor: '#3eda9b',
    alignSelf: 'center',
  },
});

export default function DietSettings({ navigation }) {
  const theme = useContext(themeContext);

  const [goal, setGoal] = useState('');

  const { user } = useAuthContext();
  const { id } = user;

  const calorieButtonPress = async () => {
    if (goal === '') {
      alert('Error: Please enter new calorie goal');
    } else if (Number.isNaN(goal) || !Number.isInteger(Number(goal)) || goal.includes('.')) {
      alert('Error: Calorie should be a number');
    } else if (goal < 1) {
      alert('Error: Calorie goal should be positive');
    } else {
      await updateCalorieGoal(id, goal);
      alert('Success: Calorie goal successfully added');
      navigation.navigate('Settings Dashboard');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

      <View>
        <TextInput
          placeholder="Add new calorie goal"
          placeholderTextColor="black"
          style={[styles.input, { borderColor: theme.color }]}
          keyboardType="numeric"
          value={goal}
          onChangeText={setGoal}
          clearButtonMode="always"
        />
        <FAB
          color="black"
          style={styles.button}
          label="Set Goal"
          onPress={calorieButtonPress}
        />
      </View>
    </SafeAreaView>
  );
}
