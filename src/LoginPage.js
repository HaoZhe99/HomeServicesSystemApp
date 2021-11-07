import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import MainButton from "./component/MainButton";
import { AntDesign } from "@expo/vector-icons";

function RegisterPage(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.IconContainer}>
        <Text style={styles.icon}>
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
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          keyboardType="default"
        />
      </View>

      <View style={styles.FooterContainer}>
        <Text style={styles.FooterTitle}>
          Forget Password?
          <Text style={styles.FooterInnerTitle}> Reset</Text>
        </Text>
      </View>

      <View style={styles.button}>
        <MainButton title="Sign In" />
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
