import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import themeContext from '../../theme/themeContext';
import { EventRegister } from 'react-native-event-listeners'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingsDashboard() {

  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      
      <TouchableOpacity style={styles.dietView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
          <Text style={styles.navText}>Diet</Text>
          <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.middleView}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
        <Text style={styles.navText}>Sleep</Text>
        <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.middleView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
          <Text style={styles.navText}>Exercise</Text>
          <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.healthView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
          <Text style={styles.navText}>Health</Text>
          <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
        </View>
      </TouchableOpacity>
      
      <View style={styles.themeView}>
        <Text style={[styles.text, {color:theme.color}]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => {
          setDarkMode(value);
          EventRegister.emit('ChangeTheme', value)
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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        color: 'white',
        alignSelf: 'center',
      },
      themeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10%'
    },
    text: {
      fontSize: 30
    },
    navText: {
      fontSize: 30,
      marginLeft: '5%'
    },
    dietView: {
      flexDirection: 'row', 
      width: '90%',
      height: '10%',
      alignSelf: 'center',
      marginTop: '9%',
      backgroundColor: '#3eda9b',
      alignItems: 'center',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderWidth: 1
    },
    middleView: {
      flexDirection: 'row', 
      width: '90%',
      height: '10%',
      alignSelf: 'center',
      backgroundColor: '#3eda9b',
      alignItems: 'center',
      borderWidth: 1
    },
    healthView: {
      flexDirection: 'row', 
      width: '90%',
      height: '10%',
      alignSelf: 'center',
      backgroundColor: '#3eda9b',
      alignItems: 'center',
      borderWidth: 1,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15
    }
})

