import { ScrollView } from 'react-native';

import React from 'react';
import SignUpForm from '../forms/signupForm';

export default function SignUpScreen() {
  return <ScrollView>{SignUpForm()}</ScrollView>;
}
