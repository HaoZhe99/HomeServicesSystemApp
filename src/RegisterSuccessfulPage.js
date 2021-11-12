import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import logo from "../assets/homeIcon.png";
import { AntDesign } from "@expo/vector-icons";

function RegisterSuccessfulPage(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer}>
        <AntDesign name="checkcircleo" size={68} color="green" />
      </View>
      <View style={styles.TitleContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.title}>Successfully</Text>
      </View>

      <View style={styles.FooterContainer}>
        <Text style={styles.FooterTitle}>Tap to Continues</Text>
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
    backgroundColor: "#009ca7",
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
  title: {
    paddingVertical: 10,
    fontSize: 30,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#ffffff",
  },
  FooterContainer: {
    bottom: -150,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  FooterTitle: {
    paddingVertical: 10,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#ffffff",
  },
});

export default RegisterSuccessfulPage;
