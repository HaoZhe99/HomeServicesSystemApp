import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import MainButton from "../component/MainButton";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function OrderFormPage({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [location, setLocation] = React.useState("");
  const [servicePackage, setPackage] = React.useState("");
  const [time, setTime] = React.useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(date.getFullYear());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    console.log("hi");
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>Cleaning Services</Text>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              label="Package"
              style={styles.textInput}
              keyboardType="default"
              value={servicePackage}
              activeOutlineColor="#009ca7"
              onChangeText={(servicePackage) => setPackage(servicePackage)}
            />
            <View style={styles.dateAndTimeContainer}>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <TextInput
                value={
                  date.getFullYear().toString() +
                  "-" +
                  (date.getMonth() + 1).toString() +
                  "-" +
                  date.getDate().toString()
                }
                mode="outlined"
                label="Date"
                style={styles.dateInput}
                activeOutlineColor="#009ca7"
                onChangeText={(date) => setDate(date)}
                right={<TextInput.Icon name="calendar" />}
                onFocus={showDatepicker}
              />
              <TextInput
                value={
                  date.getHours().toString() +
                  ":" +
                  date.getMinutes().toString()
                }
                mode="outlined"
                label="Time"
                style={styles.timeInput}
                activeOutlineColor="#009ca7"
                right={<TextInput.Icon name="clock" />}
                onChangeText={(date) => setDate(date)}
                onFocus={showTimepicker}
              />
            </View>

            <View style={styles.button}>
              <MainButton
                title="Book"
                onPress={() => navigation.navigate("OrderSuccefullyPage")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: { width: 100, height: 100 },
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 70,
    minWidth: "100%",
    minHeight: "100%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  menuText: {
    alignSelf: "flex-start",
    padding: 10,
    marginLeft: 30,
    fontSize: 20,
  },
  formContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "80%",
    height: 45,
    marginTop: 10,
    borderColor: "yellow",
  },
  dateAndTimeContainer: {
    flexDirection: "row",
  },
  dateInput: {
    width: 200,
    marginTop: 20,
    width: "40%",
    paddingRight: 5,
  },
  timeInput: {
    paddingLeft: 5,
    width: 200,
    marginTop: 20,
    width: "40%",
  },
  button: {
    width: "80%",
    paddingTop: 20,
  },
});
export default OrderFormPage;
