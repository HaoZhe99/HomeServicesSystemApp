import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import MainButton from "./component/MainButton";
import SecondaryButton from "./component/SecondaryButton";
import logo from "../assets/homeIcon.png";
import HomePage from "./HomePage.js";


function StartPage(props, navigation) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image source={logo} style={{ width: 125, height: 125 }} />
      </View>
      <View style={styles.TitleContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>Home Services</Text>
      </View>
      <View style={styles.button}>
        <MainButton title="Sign In" />
        <SecondaryButton title="Sign Up" />
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
  },
  TitleContainer: {
    paddingBottom: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    paddingBottom: 50,
  },
  button: {
    width: "80%",
  },
  title: {
    paddingVertical: 10,
    fontSize: 30,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default StartPage;
