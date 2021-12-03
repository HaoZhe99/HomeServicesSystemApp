import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import logo from ".././../assets/homeIcon.png";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function ServicerNewOrderPage({ navigation, route }) {
  // fresh page function
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const buttonStatus = "Incompleted";

  //get orders
  const [orders, setOrder] = React.useState([]);
  useEffect(() => {
    const getOrder = async () => {
      const orderFromServer = await fetchOrder();
      setOrder(orderFromServer);
    };
    getOrder();
  }, [refreshing]);

  const fetchOrder = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/orders/newOrder/1");
    const data = await res.json();
    // console.log(data.data[0]);
    return data.data;
  };

  // const viewOrder = () => {
  //   // navigation.navigate("ServicerOrderDetailPage", {
  //   //   // id: order_id,
  //   //   // time: t,
  //   //   // location: location,
  //   //   // package: servicePackage,
  //   //   // merchant_id: route.params.merchant_id,
  //   //   // merchant_name: route.params.merchant_name,
  //   // });
  // };
  // console.log(orders);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {orders == 0 ? (
          <View style={styles.noOrderContainer}>
            <Text style={styles.noOrder}>Not Order!</Text>
          </View>
        ) : (
          orders.map((order, i) => {
            const order_id = order.id;
            return (
              <View style={styles.cardContainer} key={i}>
                <Card
                  style={styles.cardContent}
                  onPress={() =>
                    navigation.navigate("ServicerOrderDetailPage", {
                      order_id: order.id,
                    })
                  }
                >
                  <Card.Content>
                    <View style={styles.row}>
                      {/* <View style={styles.merchantImage}>
                      <Image source={logo} style={{ width: 65, height: 65 }} />
                    </View> */}
                      <View style={styles.OrderText}>
                        <View style={styles.textInner}>
                          <Entypo name="shop" size={16} color="black" />
                          <Paragraph numberOfLines={1} style={styles.text}>
                            {order.merchant.name}
                          </Paragraph>
                        </View>
                        <View style={styles.textInner}>
                          <Feather name="clock" size={16} color="black" />
                          <Paragraph style={styles.text}>
                            {order.date} at {order.time}
                          </Paragraph>
                        </View>
                        <View style={styles.textInner}>
                          <FontAwesome
                            name="bookmark"
                            size={16}
                            color="black"
                          />
                          <Paragraph style={styles.text}>
                            {order.remark ? order.remark : "Nope"}
                          </Paragraph>
                        </View>
                      </View>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                          <Text style={styles.buttonTitle}>{buttonStatus}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardContainer: {
    minWidth: "100%",
    height: 100,
    marginTop: 25,
    marginBottom: 25,
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
    height: 120,
  },
  row: {
    flexDirection: "row",
  },
  merchantImage: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  OrderText: {
    width: "70%",
    paddingLeft: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#FF2400",
  },
  buttonTitle: {
    color: "#FFFFFF",
  },
  text: {
    fontSize: 14,
    top: -3,
    paddingLeft: 10,
  },
  textInner: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  noOrderContainer: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  noOrder: {
    fontSize: 18,
  },
});

export default ServicerNewOrderPage;
