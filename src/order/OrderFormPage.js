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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function OrderFormPage({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // useEffect(() => {
  //   setRefreshing(true);
  //   wait(4000).then(() => setRefreshing(false));
  // }, []);

  const [userId, setUserId] = React.useState("");
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("1");
      return JSON.parse(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  getData().then((T) => {
    T.id != null ? setUserId(T.id) : setUserId("");
  });

  const [users, setUser] = React.useState("");
  useEffect(() => {
    const getUser = async () => {
      if (userId != "") {
        const userFromServer = await fetchUser();
        setUser(userFromServer);
      }
    };
    getUser();
  }, [refreshing, userId]);

  const fetchUser = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/users/" + userId);
    const data = await res.json();
    return data.data;
  };
  // console.log(users == null ? null : users.addresses);

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
    ((date.getMonth() + 1).toString() >= 10
      ? (date.getMonth() + 1).toString()
      : ("0" + date.getMonth() + 1).toString().substring(1, 3)) +
    "-" +
    (date.getDate().toString() >= 10
      ? date.getDate().toString()
      : "0" + date.getDate().toString());

  // const t =
  //   (date.getHours().toString() >= 0 && date.getHours().toString() < 10
  //     ? "0" + date.getHours().toString()
  //     : date.getHours().toString()) +
  //   ":" +
  //   (date.getMinutes().toString() >= 0 && date.getMinutes().toString() < 10
  //     ? "0" + date.getMinutes().toString()
  //     : date.getMinutes().toString());

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

  const [time, setTime] = useState("");

  const data1 = {
    date: d,
    time: time.toString() + ":00",
    merchant_id: route.params.merchant_id,
    package_id: p,
    address: location,
    status: "pending",
    user_id: userId,
  };

  const booking = () => {
    // || date.getHours() + 8 >= 19
    if (date.getHours() + 8 < 10) {
      Alert.alert("Time Invaild!", "Selected Time not Under Service Time!", [
        {
          text: "Cancel",
        },
        { text: "Ok" },
      ]);
    } else {
      if (d == null || time == "" || location == "" || p == "") {
        Alert.alert("Input Invaild!", "Data Cannot be Empty!", [
          {
            text: "Cancel",
          },
          { text: "Ok" },
        ]);
      } else {
        try {
          axios
            .post("http://10.0.2.2:8000/api/v1/orders", data1)
            .then(function (response) {
              // handle success
              console.log(JSON.stringify(response.data));
            });
          navigation.navigate("OrderSuccefullyPage", {
            hearder: "false",
          });
        } catch (error) {
          console.log(error.message);
        }
        // if (pm === 1) {
        //   navigation.navigate("orderConfirmPage", {
        //     date: d,
        //     time: t,
        //     payment_method: pm,
        //     location: location,
        //     package: p,
        //     merchant_id: route.params.merchant_id,
        //     merchant_name: route.params.merchant_name,
        //   });
        // } else {
        //   navigation.navigate("PaymentPage", {
        //     date: d,
        //     time: t,
        //     payment_method: pm,
        //     location: location,
        //     package: p,
        //     merchant_id: route.params.merchant_id,
        //     merchant_name: route.params.merchant_name,
        //   });
        // }
      }
    }
  };

  // category get request
  const [merchants, setMerchant] = React.useState([]);
  useEffect(() => {
    const getMerchant = async () => {
      const merchantFromServer = await fetchMerchant();
      setMerchant(merchantFromServer);
    };
    getMerchant();
  }, []);

  const fetchMerchant = async () => {
    const res = await fetch(
      "http://10.0.2.2:8000/api/v1/merchants/" + route.params.merchant_id
    );
    const data = await res.json();
    return data.data;
  };

  console.log(merchants.delivery_fee);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>{route.params.c_name}</Text>
          <Text style={styles.remiderText}>*{merchants.delivery_fee}</Text>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Location</Text>
            <View style={styles.picker}>
              <Picker
                style={styles.pickerInner}
                selectedValue={location}
                onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
              >
                <Picker.Item label="Select Location" value="" />
                {users.addresses == undefined
                  ? null
                  : users.addresses.map((user, i) => {
                      return (
                        <Picker.Item
                          label={
                            user.address +
                            ", " +
                            user.state.postcode +
                            ", " +
                            user.state.area
                          }
                          value={
                            user.address +
                            ", " +
                            user.state.postcode +
                            ", " +
                            user.state.area
                          }
                          key={i}
                        />
                      );
                    })}
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
                          label={pacakage.name + " — RM " + pacakage.price}
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
              {/* <TextInput
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
              /> */}

              <View style={styles.timeInput}>
                <Text style={styles.timeText}>Time</Text>

                <Picker
                  style={styles.timePicker}
                  selectedValue={time}
                  onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
                >
                  <Picker.Item label="Time" value="" />
                  <Picker.Item label="10:00" value={10} />
                  <Picker.Item label="11:00" value={11} />
                  <Picker.Item label="12:00" value={12} />
                  <Picker.Item label="13:00" value={13} />
                  <Picker.Item label="14:00" value={14} />
                  <Picker.Item label="15:00" value={15} />
                  <Picker.Item label="16:00" value={16} />
                  <Picker.Item label="17:00" value={17} />
                  <Picker.Item label="18:00" value={18} />
                </Picker>
                <AntDesign
                  name="clockcircle"
                  size={20}
                  color="black"
                  style={styles.timeIcon}
                />
              </View>
            </View>

            {/* <Text style={styles.text}>Payment Method</Text>
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
            </View> */}

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
  remiderText: {
    alignSelf: "flex-start",
    paddingLeft: 10,
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 12,
    color: "red",
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
  timeText: {
    width: 35,
    height: 20,
    left: 10,
    bottom: 8,
    fontSize: 12,
    color: "gray",
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  timeIcon: {
    bottom: 53,
    left: 120,
  },
  dateAndTimeContainer: {
    flexDirection: "row",
    paddingBottom: 15,
  },
  dateInput: {
    width: "40%",
    paddingRight: 5,
    paddingBottom: 5,
    backgroundColor: "white",
  },
  timeInput: {
    width: "40%",
    height: 58,
    borderColor: "#009ca7",
    borderRadius: 4,
    borderWidth: 1.2,
    marginTop: 6,
    backgroundColor: "white",
  },
  picker: {
    width: "80%",
    height: 45,
    borderColor: "#a6a6a6",
    borderRadius: 5,
    borderWidth: 1.5,
    backgroundColor: "white",
    marginBottom: 20,
  },
  pickerInner: {
    top: -5,
    left: 5,
  },
  timePicker: {
    top: -16,
    left: 5,
  },
  button: {
    width: "80%",
    paddingTop: 20,
  },
});
export default OrderFormPage;
