import {
  View, Text, Button, StyleSheet, Switch,
} from 'react-native';
import React from 'react';
// import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as data from '../../../../assets/animation.json';

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
              navigation.navigate('Log In');
            }}
          />
          <Button
            title="Sign up for account"
            onPress={() => {
              navigation.navigate('Sign Up');
            }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
