import React, { useContext, useEffect, useState } from "react";
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
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "./component/Auth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function LoginPage({ navigation, route }) {
  const auth = useContext(Auth)
  //   fresh page function
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [email, setEmailText] = React.useState("");
  const [password, setPasswordText] = React.useState("");

  const data = {
    email: email,
    password: password,
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
      try {
        axios
          .post("http://10.0.2.2:8000/api/v1/users/login", data)
          .then(function (response) {
            // handle success
            console.log(JSON.stringify(response.data));
            if (JSON.stringify(response.data) == "false") {
              Alert.alert("Data Invaild!", "Password or Email Invaild!", [
                {
                  text: "Cancel",
                },
                { text: "Ok" },
              ]);
            } else {
              console.log("login successfully");

              // navigation.navigate("TabNav", {
              //   hearder: "false",
              // });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUser = async () => {
    if (email == "" || password == "") {
      Alert.alert("Input Invaild!", "Data Cannot be Empty!", [
        {
          text: "Cancel",
        },
        { text: "Ok" },
      ]);
    } else {
      try {
        await axios
          .post("http://10.0.2.2:8000/api/v1/users/checkUser", data)
          .then(function (response) {
            // handle success
            // console.log(JSON.stringify(response.data));
            storeData(response.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("1", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("1");
      // console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  // getData().then((T) => console.log(T));

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.IconContainer}>
        <Text
          style={styles.icon}
          onPress={() => navigation.dispatch(StackActions.popToTop())}
        >
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
        <MainButton
          title="Sign In"
          onPress={async () => {
            // login();
            await getUser();
            auth("true");
            // getData();
            // clearAll();
            navigation.dispatch(StackActions.popToTop());
            // setRefreshing(true);
            // wait(500).then(() => setRefreshing(false));
          }}
        />
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
export default LoginPage;
