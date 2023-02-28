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
        <Text style={[styles.text, {color:theme.color}]}>Name</Text>
        <Text style={[styles.text, {color:theme.color}]}>Email</Text>
        <Text style={[styles.text, {color:theme.color}]}>Phone</Text>
        <Text style={[styles.text, {color:theme.color}]}>Weight</Text>
        <Text style={[styles.text, {color:theme.color}]}>Height</Text>
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
    text: {
      fontSize: 30,
      margin: '8%'
    }

})

