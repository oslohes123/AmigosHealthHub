import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import UpdateUserData from './UpdateUserData';

const EditDetailsScreen = ({ supabase, userId, initialData }) => {
  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [email, setEmail] = useState(initialData.email);
  const [weight, setWeight] = useState(initialData.weight);
  const [height, setHeight] = useState(initialData.height);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput 
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput 
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Weight</Text>
      <TextInput 
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
      />
      <Text style={styles.label}>Height</Text>
      <TextInput 
        style={styles.input}
        value={height}
        onChangeText={setHeight}
      />
      <Button 
        title="Update Details" 
        onPress={() => UpdateUserData({
          supabase,
          userId,
          initialData: { firstName, lastName, email, weight, height }
        })} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'left'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10
  }
});

export default EditDetailsScreen;
