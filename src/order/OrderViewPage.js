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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function OrderViewPage(props) {
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
  }, []);

  const fetchOrder = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/orders");
    const data = await res.json();
    console.log(data.data[0].date);
    return data.data;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {orders.map((order, i) => {
          return (
            <View style={styles.cardContainer} key={i}>
              <Card style={styles.cardContent}>
                <Card.Content>
                  <View style={styles.row}>
                    <View style={styles.merchantImage}>
                      <Image source={logo} style={{ width: 65, height: 65 }} />
                    </View>
                    <View style={styles.OrderText}>
                      <Paragraph numberOfLines={2}>
                        {order.merchant.name}
                      </Paragraph>
                      <Paragraph>
                        {order.date} at {order.time}
                      </Paragraph>
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
        })}
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
    width: "50%",
    paddingLeft: 10,
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
    width: 100,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#FF2400",
  },
  buttonTitle: {
    color: "#FFFFFF",
  },
});

export default OrderViewPage;
