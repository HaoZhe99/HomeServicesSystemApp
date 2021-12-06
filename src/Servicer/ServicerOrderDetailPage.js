import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

function ServicerOrderDetailPage({ navigation, route }) {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //get orders
  const [orders, setOrder] = React.useState("");
  useEffect(() => {
    const getOrder = async () => {
      const orderFromServer = await fetchOrder();
      setOrder(orderFromServer);
    };
    getOrder();
  }, [refreshing]);

  const fetchOrder = async () => {
    const res = await fetch(
      "http://10.0.2.2:8000/api/v1/orders/" + route.params.order_id
    );
    const data = await res.json();
    return data.data;
  };

  const data = {
    status: "completed",
  };

  const updateOrderStatus = () => {
    try {
      axios
        .post(
          "http://10.0.2.2:8000/api/v1/orders/updateOrder/" +
            route.params.order_id,
          data
        )
        .then(function (response) {
          // handle success
          console.log(JSON.stringify(response.data));
        });
      navigation.navigate("OrderCompletedSuccessfully", {
        hearder: "false",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const OrderAlert = () => {
    Alert.alert("Are You Sure?", "Order Completed", [
      {
        text: "Cancel",
      },
      { text: "Completed", onPress: () => updateOrderStatus() },
    ]);
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
          <Text style={styles.menuText}>
            {orders.status == "completed"
              ? "Completed Order"
              : "Incomplete Order"}
          </Text>

          <View style={styles.cardContainer}>
            <Card style={styles.cardContent}>
              <Card.Content>
                <View style={styles.cardDetail}>
                  <View style={styles.cardInner}>
                    <View style={styles.textInner}>
                      <Entypo name="shop" size={18} color="black" />
                      <Text style={styles.text}>
                        {orders.merchant == undefined
                          ? null
                          : orders.merchant.name}
                      </Text>
                    </View>
                    <View style={styles.textInner}>
                      <Ionicons
                        name="location-outline"
                        size={18}
                        color="black"
                      />
                      <Text style={styles.text}>{orders.address}</Text>
                    </View>
                    <View style={styles.textInner}>
                      <Ionicons
                        name="person-circle-outline"
                        size={18}
                        color="black"
                      />
                      <Text style={styles.text}>
                        {orders.user == undefined ? null : orders.user.name}
                      </Text>
                    </View>
                    <View style={styles.textInner}>
                      <Feather name="clock" size={18} color="black" />
                      <Text style={styles.text}>
                        {orders.date} at {orders.time}
                      </Text>
                    </View>
                    <View style={styles.textInner}>
                      <MaterialIcons
                        name="miscellaneous-services"
                        size={18}
                        color="black"
                      />
                      <Text style={styles.text}>
                        {orders.package == undefined
                          ? null
                          : orders.package.name}
                      </Text>
                    </View>
                    <View style={styles.textInner}>
                      <MaterialIcons
                        name="attach-money"
                        size={18}
                        color="black"
                      />
                      <Text style={styles.text}>{orders.price}</Text>
                    </View>
                    <View style={styles.textInner}>
                      <AntDesign name="checkcircleo" size={18} color="black" />
                      <Text style={styles.text}>
                        {orders.status == "incomplete"
                          ? "Incomplete"
                          : "Completed"}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          {orders.status == "completed" ? null : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => OrderAlert()}
              >
                <Text style={styles.buttonTitle}>Completed</Text>
              </TouchableOpacity>
            </View>
          )}
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
    alignSelf: "center",
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
    height: 300,
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
  buttonContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#1fae51",
    minWidth: "85%",
  },
  buttonTitle: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export default ServicerOrderDetailPage;
