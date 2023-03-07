import React, {useContext} from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme/theme';
import themeContext from '../../theme/themeContext';

export default function Profile() {

  const theme = useContext(themeContext)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      
      <View style={styles.iconView}>
        <Ionicons name={'person-circle-outline'} size={80} color={theme.color} />
      </View>
      
      <View> 

        <View style={styles.details}>  
          <Text style={[styles.head, {color:theme.color}]}>Name</Text>
          <Text style={[styles.body, {color:theme.color}]}>abcdefg</Text>
        </View>

        <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Email</Text>
          <Text style={[styles.body, {color:theme.color}]}>abcd@mail.com</Text>
        </View>

        <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Phone</Text>
          <Text style={[styles.body, {color:theme.color}]}>+44   712345678</Text>
        </View>

        <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Weight</Text>
          <Text style={[styles.body, {color:theme.color}]}>60kg</Text>
        </View>
        
        <View style={styles.details}> 
          <Text style={[styles.head, {color:theme.color}]}>Height</Text>
          <Text style={[styles.body, {color:theme.color}]}>160cm</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    iconView: {
      alignItems: 'center',
      margin: '7%'
    },
    head: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    details: {
      margin: '5%'
    },
    body: {
      fontSize: 30,
    }

})

