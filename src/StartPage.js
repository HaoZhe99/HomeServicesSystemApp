import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import MainButton from "./component/MainButton";
import SecondaryButton from "./component/SecondaryButton";
import logo from "../assets/homeIcon.png";

function StartPage(props) {
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
        <MainButton title="Sign In" bgc="#0cdfd9" />
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
    paddingBottom: "50px",
  },
  ImageContainer: {
    paddingBottom: "50px",
  },
  button: {
    width: "80%",
  },
  title: {
    fontFamily: "",
    paddingBottom: "20px",
    fontSize: 36,
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
