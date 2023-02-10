import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Client } from '@supabase/supabase-js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const supabase = new Client({
  apiKey: '<API_KEY>',
  uid: '<UID>',
  databaseURL: '<DATABASE_URL>'
});

const UpdateUserData = async ({ supabase, userId, initialData }) => {
  const { firstName, lastName, email, weight, height } = initialData;
  const query = `
    UPDATE users
    SET first_name = '${firstName}',
        last_name = '${lastName}',
        email = '${email}',
        weight = '${weight}',
        height = '${height}'
    WHERE id = '${userId}'
  `;

  try {
    const result = await supabase.raw(query);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

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
    flex: 1
  }


