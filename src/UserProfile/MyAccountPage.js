import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Card, Paragraph, RadioButton, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../component/Auth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function MyAccountPage({ navigation, route }) {
  //   fresh page function
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.cardContainer}>
          <Card style={styles.cardContent}>
            <Card.Content>
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate("ProfilePage")}
              >
                <View style={styles.firstIcon}>
                  <Ionicons name="person" size={30} color="black" />
                </View>
                <View style={styles.text}>
                  <Paragraph>Edit Proflie</Paragraph>
                </View>
                <View style={styles.secondIcon}>
                  <AntDesign name="edit" size={25} color="black" />
                </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>
          <Card style={styles.cardContent}>
            <Card.Content>
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate("AddAddressPage")}
              >
                <View style={styles.firstIcon}>
                  <Entypo name="location" size={30} color="black" />
                </View>
                <View style={styles.text}>
                  <Paragraph>Add Address</Paragraph>
                </View>
                <View style={styles.secondIcon}>
                  <AntDesign name="edit" size={25} color="black" />
                </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>
          <Card style={styles.cardContent}>
            <Card.Content>
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate("AddPMPage")}
              >
                <View style={styles.firstIcon}>
                  <AntDesign name="creditcard" size={30} color="black" />
                </View>
                <View style={styles.text}>
                  <Paragraph>Add Payment Method</Paragraph>
                </View>
                <View style={styles.secondIcon}>
                  <AntDesign name="edit" size={25} color="black" />
                </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    minWidth: "100%",
    maxHeight: 1000,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardContent: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: 10,
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  firstIcon: {
    paddingRight: 20,
    width: "18%",
  },
  text: {
    textAlign: "center",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "70%",
  },
  secondIcon: {
    width: "16%",
  },
});

export default MyAccountPage;
