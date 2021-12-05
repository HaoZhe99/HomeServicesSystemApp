import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

function OrderCompletedSuccessfully({ navigation }) {
  const goHonePage = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.c} onPress={() => goHonePage()}>
        <View style={styles.ImageContainer}>
          <AntDesign name="checkcircleo" size={68} color="green" />
        </View>
        <View style={styles.TitleContainer}>
          <Text style={styles.title}>Order Completed</Text>
        </View>

        <View style={styles.FooterContainer}>
          <Text style={styles.FooterTitle}>Tap to Continues</Text>
        </View>
      </TouchableOpacity>
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
  c: {
    width: "100%",
    height: 700,
    paddingTop: 200,
  },
  TitleContainer: {
    paddingBottom: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    paddingBottom: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
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

export default OrderCompletedSuccessfully;
