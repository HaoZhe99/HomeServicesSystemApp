import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MainButton from "../component/MainButton";
import { Picker } from "@react-native-picker/picker";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function OrderFormPage({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [location, setLocation] = React.useState("");
  const [servicePackage, setPackage] = React.useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const d =
    date.getFullYear().toString() +
    "-" +
    (date.getMonth() + 1).toString() +
    "-" +
    date.getDate().toString();

  const t =
    (date.getHours().toString() >= 0 && date.getHours().toString() < 10
      ? "0" + date.getHours().toString()
      : date.getHours().toString()) +
    ":" +
    (date.getMinutes().toString() >= 0 && date.getMinutes().toString() < 10
      ? "0" + date.getMinutes().toString()
      : date.getMinutes().toString());

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const booking = () => {
    console.log(date.getHours().toString());
    if (date.getHours().toString() < 10 || date.getHours().toString() >= 18) {
      Alert.alert("Time Invaild!", "Selected Time not Under Service Time!", [
        {
          text: "Cancel",
        },
        { text: "Ok" },
      ]);
    } else {
      navigation.navigate("orderConfirmPage", {
        date: d,
        time: t,
        location: location,
        package: servicePackage,
        merchant_id: route.params.merchant_id,
        merchant_name: route.params.merchant_name,
      });
    }
  };
  console.log(route.params.merchant_id);

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
            <Text style={styles.text}>Location</Text>
            <View style={styles.picker}>
              <Picker
                style={styles.pickerInner}
                selectedValue={location}
                onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
              >
                <Picker.Item label="Select Location" value="" />
                <Picker.Item
                  label="No 5, Jln Impian Emas 2, Taman Impian Emas"
                  value="No 5, Jln Impian Emas 2, Taman Impian Emas"
                />
              </Picker>
            </View>
            <Text style={styles.text}>Package</Text>
            <View style={styles.picker}>
              <Picker
                style={styles.pickerInner}
                selectedValue={servicePackage}
                onValueChange={(itemValue, itemIndex) => setPackage(itemValue)}
              >
                <Picker.Item label="Select Package" value="" />
                <Picker.Item label="Package A" value={1} />
              </Picker>
            </View>
            <View style={styles.dateAndTimeContainer}>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                  maximumDate={new Date(2031, 12, 31)}
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
                outlineColor="#009ca7"
                onChangeText={(date) => setDate(date)}
                right={<TextInput.Icon name="calendar" />}
                onFocus={showDatepicker}
              />
              <TextInput
                value={
                  (date.getHours().toString() >= 0 &&
                  date.getHours().toString() < 10
                    ? "0" + date.getHours().toString()
                    : date.getHours().toString()) +
                  ":" +
                  (date.getMinutes().toString() >= 0 &&
                  date.getMinutes().toString() < 10
                    ? "0" + date.getMinutes().toString()
                    : date.getMinutes().toString())
                }
                mode="outlined"
                label="Time"
                style={styles.timeInput}
                activeOutlineColor="#009ca7"
                outlineColor="#009ca7"
                right={<TextInput.Icon name="clock" />}
                onChangeText={(date) => setDate(date)}
                onFocus={showTimepicker}
              />
            </View>

            <View style={styles.button}>
              <MainButton title="Booking" onPress={() => booking()} />
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
    marginBottom: 10,
    fontSize: 20,
  },
  formContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: "80%",
    paddingBottom: 5,
    fontSize: 12,
    color: "#009ca7",
  },
  dateAndTimeContainer: {
    flexDirection: "row",
  },
  dateInput: {
    width: 200,
    width: "40%",
    paddingRight: 5,
    paddingBottom: 5,
  },
  timeInput: {
    width: 200,
    width: "40%",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  picker: {
    width: "80%",
    height: 45,
    borderColor: "#a6a6a6",
    borderRadius: 5,
    borderWidth: 1.5,
    backgroundColor: "#f6f6f6",
    marginBottom: 20,
  },
  pickerInner: {
    top: -5,
    left: 5,
  },
  button: {
    width: "80%",
    paddingTop: 20,
  },
});
export default OrderFormPage;
