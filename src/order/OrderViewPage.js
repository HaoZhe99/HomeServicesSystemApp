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
  Alert,
  Pressable,
  Modal,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
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
    const res = await fetch("http://10.0.2.2:8000/api/v1/orders");
    const data = await res.json();
    console.log(data.data[0].date);
    return data.data;
  };

  const CommentAndRate = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => Alert.alert("OK Pressed") },
    ]);
  };
  const [modalVisible, setModalVisible] = useState(false);

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
                      <TouchableOpacity
                        style={
                          order.status == "incomplete"
                            ? styles.buttonRed
                            : styles.buttonGreen
                        }
                      >
                        <Text style={styles.buttonTitle}>
                          {order.status == "incomplete"
                            ? "Incomplete"
                            : "Completed"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {order.status == "completed" ? (
                    <View style={styles.CommentAndRateContaniner}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => CommentAndRate()}
                      >
                        <Text style={styles.title}>Comment And Rate</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
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
    height: 135,
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
  buttonRed: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#FF2400",
  },
  buttonGreen: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#1fae51",
  },
  buttonTitle: {
    color: "#FFFFFF",
  },
  CommentAndRateContaniner: {
    marginTop: 10,
    height: 35,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#009ca7",
  },
  title: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});

export default OrderViewPage;
