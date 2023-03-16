import * as Yup from "yup";

import { Button, Text, TextInput, View, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext } from "react";

import { Formik } from "formik";
//import { deleteAccountWrapper } from "../hooks/deleteAccount";
import { deleteAccountWrapper } from "../hooks/useDeleteAccount";
import { globalStyles } from "../../../../styles/global";
import { useAuthContext } from "../../Authentication/context/AuthContext";

const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
const deleteAccountSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      passwordRegex,
      "Password must contain atleast 1 lowercase letter, 1 uppercase letter and 1 special character (eg. @, #, $, %, ^, &, +, *, !, =)"
    ),
});

export const deleteAccountForm = () => {
  const { deleteAccount, isLoading, error } = deleteAccountWrapper();
  const { user } = useAuthContext();
  // const userEmail = getUserDetails();
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.head}>Email</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Formik
        initialValues={{ current_password: "" }}
        onSubmit={async (values) => {
          await deleteAccount(values.current_password);
        }}
        validationSchema={deleteAccountSchema}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Your password:"
              onChangeText={props.handleChange("current_password")}
              value={props.values.current_password}
            />
            <Text>{props.errors.current_password}</Text>

            <Button
              title="Save details"
              onPress={props.handleSubmit}
              disabled={isLoading}
            />
            {error && <Text className="error">{error}</Text>}
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  email: {
    fontSize: 23,
    marginLeft: '5%'
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '5%'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%'
  },
})
