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
        <Text style={styles.title}>Sign up into your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      <View style={styles.TextInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          keyboardType="default"
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          keyboardType="default"
        />
      </View>

      <View style={styles.button}>
        <MainButton title="Sign Up" />
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
