import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MainButton from "../component/MainButton";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

function orderConfirmPage({ navigation, route }) {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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

  const [orderDetail, setOrderDetail] = React.useState("");
  useEffect(() => {
    const getOrderDetail = async () => {
      const orderDetailFromServer = await fetchOrderDetil();
      setOrderDetail(orderDetailFromServer);
    };
    getOrderDetail();
  }, [refreshing]);

  const fetchOrderDetil = async () => {
    const res = await fetch(
      "http://10.0.2.2:8000/api/v1/orders/" + route.params.order_id
    );
    const data = await res.json();
    // console.log(data.data.merchant.name);
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

  const data1 = {
    date: orderDetail.date,
    time: orderDetail.time,
    merchant_id:
      orderDetail.merchant == undefined ? null : orderDetail.merchant.id,
    package_id:
      orderDetail.package == undefined ? null : orderDetail.package.id,
    status: "incomplete",
    price: orderDetail.price,
    user_id: userId,
  };

  const orderDone = () => {
    if (pm == 1 || pm == "1") {
      try {
        axios
          .post(
            "http://10.0.2.2:8000/api/v1/orders/orderConfirm/" + orderDetail.id,
            {
              status: "incomplete",
              payment_method_id: pm,
            }
          )
          .then(function (response) {
            // handle success
            console.log(JSON.stringify(response.data));
          });
        navigation.navigate("PaymentSuccefullyPage", {
          hearder: "false",
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      navigation.navigate("Payment", { pm: pm, order: orderDetail.id });
    }
  };

  console.log(orderDetail.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>Booking Confirmation</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.cardContent}>
              <Card.Content>
                <View style={styles.cardDetail}>
                  <Paragraph style={styles.paragraph}>Order Review</Paragraph>
                  <View style={styles.cardInner}>
                    <View style={styles.textInner}>
                      <Entypo name="shop" size={16} color="black" />
                      <Text style={styles.text}>
                        {orderDetail.merchant == undefined
                          ? null
                          : orderDetail.merchant.name}
                      </Text>
                    </View>
                    <View style={styles.textInner}>
                      <Ionicons name="location" size={16} color="black" />
                      <Text style={styles.text}>{orderDetail.address}</Text>
                    </View>
                    <View style={styles.textInner}>
                      <Feather name="clock" size={16} color="black" />
                      <Text style={styles.text}>
                        {orderDetail.date} at {orderDetail.time}
                      </Text>
                    </View>
                    <View style={styles.textInner}>
                      <MaterialIcons
                        name="miscellaneous-services"
                        size={18}
                        color="black"
                      />
                      <Text style={styles.text}>
                        {orderDetail.package == undefined
                          ? null
                          : orderDetail.package.name}
                      </Text>
                    </View>
                    <View style={styles.textInner}>
                      <MaterialIcons
                        name="attach-money"
                        size={16}
                        color="black"
                      />
                      <Text style={styles.text}>RM {orderDetail.price}</Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          <Text style={styles.pickerText}>Payment Method</Text>
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
            <MainButton title="Confirm" onPress={() => orderDone()} />
          </View>
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
    backgroundColor: "#FFFFFF",
  },
  menuContainer: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 50,
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
    paddingLeft: 35,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 25,
  },
  paragraph: {
    color: "#009ca7",
    fontFamily: "notoserif",
  },
  cardContainer: {
    width: "93%",
    paddingBottom: 10,
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
  },
  row: {
    flexDirection: "row",
  },
  cardDetail: {
    width: "90%",
    height: 200,
    // backgroundColor: "black",
  },
  cardInner: {
    minWidth: "100%",
    paddingTop: 10,
  },
  textInner: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    top: -3,
    paddingLeft: 10,
  },
  button: {
    minWidth: "90%",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  pickerText: {
    marginLeft: 35,
    paddingBottom: 10,
    fontSize: 14,
    color: "black",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  picker: {
    width: 330,
    height: 45,
    borderColor: "#a6a6a6",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  pickerInner: {
    top: -5,
    left: 5,
  },
});

export default orderConfirmPage;
