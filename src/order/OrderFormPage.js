import React, { useEffect, useState } from "react";
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

  const [p, setP] = React.useState("");

  // get package
  const [servicePackages, setPackage] = React.useState("");
  useEffect(() => {
    const getPackage = async () => {
      const packageFromServer = await fetchPackage();
      setPackage(packageFromServer);
    };
    getPackage();
  }, []);

  const fetchPackage = async () => {
    const res = await fetch(
      "http://10.0.2.2:8000/api/v1/packages/packageFilter/" +
        route.params.merchant_id
    );
    const data = await res.json();
    return data.data;
  };

  const [pm, setPm] = React.useState([]);

  // get payment method
  const [paymentMethods, setPaymentMethods] = React.useState([]);
  useEffect(() => {
    const getPaymentMethods = async () => {
      const paymentMethodFromServer = await fetchPaymentMethods();
      setPaymentMethods(paymentMethodFromServer);
    };
    getPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/payment-methods");
    const data = await res.json();
    return data.data;
  };
  console.log(paymentMethods.length == 0 ? null : paymentMethods[0].name);

  const booking = () => {
    if (date.getHours().toString() < 10 || date.getHours().toString() >= 18) {
      Alert.alert("Time Invaild!", "Selected Time not Under Service Time!", [
        {
          text: "Cancel",
        },
        { text: "Ok" },
      ]);
    } else {
      if (d == null || t == null || location == "" || p == "" || pm == "") {
        Alert.alert("Input Invaild!", "Data Cannot be Empty!", [
          {
            text: "Cancel",
          },
          { text: "Ok" },
        ]);
      } else {
        // console.log(pm);
        if (pm === 1) {
          navigation.navigate("orderConfirmPage", {
            date: d,
            time: t,
            payment_method: pm,
            location: location,
            package: p,
            merchant_id: route.params.merchant_id,
            merchant_name: route.params.merchant_name,
          });
        } else {
          navigation.navigate("PaymentPage", {
            date: d,
            time: t,
            payment_method: pm,
            location: location,
            package: p,
            merchant_id: route.params.merchant_id,
            merchant_name: route.params.merchant_name,
          });
        }
      }
    }
  };

  // console.log(servicePackages[0] == undefined ? null : servicePackages[0].id);

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
                selectedValue={p}
                onValueChange={(itemValue) => setP(itemValue)}
              >
                <Picker.Item label="Select Package" value="" />
                {servicePackages.length == 0
                  ? null
                  : servicePackages.map((pacakage, i) => {
                      return (
                        <Picker.Item
                          label={pacakage.name}
                          value={pacakage.id}
                          key={i}
                        />
                      );
                    })}
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

            <Text style={styles.text}>Payment Method</Text>
            <View style={styles.picker}>
              <Picker
                style={styles.pickerInner}
                selectedValue={pm}
                onValueChange={(itemValue) => setPm(itemValue)}
              >
                <Picker.Item label="Select Payment Method" value="" />
                {paymentMethods.length == 0
                  ? null
                  : paymentMethods.map((paymentMethod, i) => {
                      return (
                        <Picker.Item
                          label={paymentMethod.name}
                          value={paymentMethod.id}
                          key={i}
                        />
                      );
                    })}
              </Picker>
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
    paddingBottom: 15,
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
