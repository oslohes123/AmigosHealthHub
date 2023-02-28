import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import themeContext from '../../theme/themeContext';
import { EventRegister } from 'react-native-event-listeners'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingsDashboard({ navigation }) {

  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false)

  const pressHandler1 = () => {
    navigation.navigate('Diet Settings');
  }

  const pressHandler2 = () => {
    navigation.navigate('Exercise Settings');
  }

  const pressHandler3 = () => {
    navigation.navigate('Sleep Settings');
  }

  const pressHandler4 = () => {
    navigation.navigate('Health Settings');
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      
      <TouchableOpacity style={styles.profileView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
          <Ionicons name={'person-circle-outline'} size={80} color={'black'} />
          <View>
            <Text style={styles.username}>Shazeen</Text>
            <Text style={styles.profileText}>+44 123456789</Text>
            <Text style={styles.profileText}>shazeen@mail.mail</Text>
          </View>
          <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dietView} onPress={pressHandler1}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
          <Text style={styles.navText}>Diet</Text>
          <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.middleView } onPress={pressHandler3}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
        <Text style={styles.navText}>Sleep</Text>
        <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.middleView} onPress={pressHandler2}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
          <Text style={styles.navText}>Exercise</Text>
          <Ionicons name={'chevron-forward-outline'} size={32} color={'black'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.healthView} onPress={pressHandler4}>
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
    },
    profileView: {
      flexDirection: 'row', 
      width: '90%',
      height: '15%',
      alignSelf: 'center',
      marginTop: '9%',
      backgroundColor: '#3eda9b',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 1,
      justifyContent: 'center',
    },
    profileText: {
      fontSize: 20,
      marginRight: '22%'
    },
    username: {
      fontSize: 30,
      fontWeight: 'bold'
    }
})

