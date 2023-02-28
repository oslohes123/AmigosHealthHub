import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Switch} from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../../theme/themeContext';

export default function DietSettings() {

  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false)

  const [showHeader, setShowHeader] = useState(false)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={styles.CalorieView}>
        <Text style={[styles.text, {color:theme.color}]}>Calories to goal</Text>
        <Switch
          value={showHeader}
          onValueChange={(value) => {
          setShowHeader(value);
          EventRegister.emit('ChangeHeader', value)
          }}
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
  CalorieView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
    marginTop: '10%'
  },
  text: {
    fontSize: 30
},
})

