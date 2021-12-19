import React, { useEffect, useState } from "react";
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

function RegisterPage({ navigation }) {
  const [email, setEmailText] = React.useState("");
  const [password, setPasswordText] = React.useState("");

  // category random get request
  const [user, setUser] = React.useState("");
  useEffect(() => {
    const getUser = async () => {
      const userFromServer = await fetchUser();
      setUser(userFromServer);
    };
    getUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/users");
    const data = await res.json();
    // console.log(data.data);
    return data.data;
  };

  const login = () => {
    if (email == "" || password == "") {
      Alert.alert("Input Invaild!", "Data Cannot be Empty!", [
        {
          text: "Cancel",
        },
        { text: "Ok" },
      ]);
    } else {
      if (email == email && password == password) {
      } else {
        Alert.alert("Data Invaild!", "Password or Email Invaild!", [
          {
            text: "Cancel",
          },
          { text: "Ok" },
        ]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.IconContainer}>
        <Text style={styles.icon} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Text>
      </View>

      <View style={styles.TitleContainer}>
        <Text style={styles.title}>Sign In into your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      <View>
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
      </View>

      <View style={styles.FooterContainer}>
        <Text style={styles.FooterTitle}>
          Forget Password?
          <Text style={styles.FooterInnerTitle}> Reset</Text>
        </Text>
      </View>

      <View style={styles.button}>
        <MainButton title="Sign In" onPress={() => login()} />
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
  FooterContainer: {
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
    top: -100,
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
});
export default RegisterPage;
