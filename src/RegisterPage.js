import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import MainButton from "./component/MainButton";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import RegisterSuccessfulPage from "./RegisterSuccessfulPage";

function RegisterPage(props) {
  const [username, setUsernameText] = React.useState("");
  const [email, setEmailText] = React.useState("");
  const [password, setPasswordText] = React.useState("");
  const [confirmPassword, setConfirmPasswordText] = React.useState("");

  const data = {
    username: username,
    email: email,
    password: password,
  };

  const sendGetRequest = () => {
    try {
      axios
        .post("http://10.0.2.2:8000/api/v1/users/register", data)
        .then(function (response) {
          // handle success
          console.log(JSON.stringify(response.data));
          Alert.alert("Register Successfully");
        });
    } catch (error) {
      console.log(error.message);
    }
    setUsernameText("");
    setEmailText("");
    setPasswordText("");
    setConfirmPasswordText("");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.IconContainer}>
        <Text style={styles.icon}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Text>
      </View>

      <View style={styles.TitleContainer}>
        <Text style={styles.title}>Sign up into your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      <View style={styles.TextInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          value={username}
          textContentType="username"
          onChangeText={(username) => setUsernameText(username)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="default"
          value={email}
          textContentType="emailAddress"
          onChangeText={(email) => setEmailText(email)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          keyboardType="default"
          value={password}
          textContentType="password"
          onChangeText={(password) => setPasswordText(password)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(confirmPassword) =>
            setConfirmPasswordText(confirmPassword)
          }
        />
      </View>

      <View style={styles.button}>
        <MainButton title="Sign Up" onPress={() => sendGetRequest()} />
      </View>

      <View style={styles.TitleContainer}>
        <Text style={styles.FooterTitle}>
          Already have an account?
          <Text style={styles.FooterInnerTitle}> Login</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    lineHeight: 20,
  },
  IconContainer: {
    paddingBottom: 30,
  },
  TitleContainer: {
    paddingBottom: 30,
  },
  TextInputContainer: {
    paddingBottom: 30,
  },
  ImageContainer: {
    paddingBottom: 50,
  },
  button: {
    width: "80%",
  },
  FooterInnerTitle: {
    minWidth: "80%",
    paddingVertical: 10,
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#009ca7",
  },
  FooterTitle: {
    minWidth: "80%",
    paddingVertical: 10,
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  icon: {
    minWidth: "80%",
    letterSpacing: 0.25,
    color: "black",
    top: -20,
  },
  title: {
    minWidth: "80%",
    paddingVertical: 10,
    fontSize: 30,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
  input: {
    height: 40,
    minWidth: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default RegisterPage;
