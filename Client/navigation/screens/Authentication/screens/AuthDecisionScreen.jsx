import {
  View, Text, Button, StyleSheet, Switch,
} from 'react-native';
import React, { useState, useContext } from 'react';
// import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventRegister } from 'react-native-event-listeners';
import * as data from '../../../../assets/animation.json';
import themeContext from '../../../theme/themeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: '10%',
  },
  animation: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default function AuthDecisionScreen({ navigation }) {
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.animation}>
        <Text style={styles.text}>HEALTH HUB</Text>
        {/* <LottieView
          source={data}
          autoPlay
          loop
          speed={1.5}
        /> */}
        <SafeAreaView style={{ marginTop: '100%' }}>
          <Button
            title="Log into account"
            onPress={() => {
              console.log('go to log in screen.');
              navigation.navigate('Log In');
            }}
          />
          <Button
            title="Sign up for account"
            onPress={() => {
              console.log('go to sign up screen.');
              navigation.navigate('Sign Up');
            }}
          />
          <View style={styles.themeView}>
            <Text style={[styles.text, { color: theme.color }]}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={(value) => {
                setDarkMode(value);
                EventRegister.emit('ChangeTheme', value);
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
