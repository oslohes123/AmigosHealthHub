import React, {useContext} from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme/theme';
import themeContext from '../../theme/themeContext';
//import ChangeUserDetailsScreen from '../ChangeUserDetail/screens/ChangeUserDetailsScreen';
import { formikChangeUserDetailsForm } from '../ChangeUserDetail/forms/changeUserDetailsForm';

export default function Profile({navigation}) {

  const theme = useContext(themeContext)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      
      <View style={styles.iconView}>
        <Ionicons name={'person-circle-outline'} size={80} color={theme.color} />
      </View>

      {formikChangeUserDetailsForm()}
      
      <View> 

        {/* <View style={styles.details}>  
          <Text style={[styles.head, {color:theme.color}]}>First Name</Text>
          <Text style={[styles.body, {color:theme.color}]}>abcdefg</Text>
        </View>

        <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Last Name</Text>
          <Text style={[styles.body, {color:theme.color}]}>aifndnf</Text>
        </View>

        <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Email</Text>
          <Text style={[styles.body, {color:theme.color}]}>gmail.com</Text>
        </View>

        <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Age</Text>
          <Text style={[styles.body, {color:theme.color}]}>2</Text>
        </View> */}
        
        {/* <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Height</Text>
          <Text style={[styles.body, {color:theme.color}]}>160cm</Text>
        </View> */}

      </View>

      <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('Change password Pressed');
                    navigation.navigate('Change User Password');
                }}
            >
                <Text style={styles.buttonText}>Change password</Text>
                <Ionicons name="ios-arrow-forward" size={32} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('Delete account');
                    navigation.navigate('Delete Account');
                }}
            >
                <Text style={styles.buttonText}>Delete Account</Text>
                <Ionicons name="ios-arrow-forward" size={32} color="black" />
            </TouchableOpacity>   
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    iconView: {
      alignItems: 'center',
      margin: '1%'
    },
    head: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    details: {
      margin: '2%'
    },
    body: {
      fontSize: 30,
    },
    button: {
      flexDirection: 'row', 
      width: '90%',
      height: '10%',
      alignSelf: 'center',
      margin: '2%',
      backgroundColor: '#3eda9b',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 1
  },
  buttonText: {
    fontSize: 26,
    marginLeft: '5%'
}

})

