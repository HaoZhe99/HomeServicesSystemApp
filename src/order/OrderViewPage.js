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
  Modal,
  Pressable,
} from "react-native";
import { Card, Paragraph, RadioButton, TextInput } from "react-native-paper";
import logo from ".././../assets/homeIcon.png";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function OrderViewPage({ navigation }) {
  //modal
  const [modalVisible, setModalVisible] = useState(false);

  // fresh page function
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

  //get orders
  const [orders, setOrder] = React.useState([]);
  useEffect(() => {
    const getOrder = async () => {
      if (userId == "") return;
      const orderFromServer = await fetchOrder();
      setOrder(orderFromServer);
    };
    getOrder();
  }, [refreshing, userId]);

  const fetchOrder = async () => {
    const res = await fetch(
      "http://10.0.2.2:8000/api/v1/orders/orderFilterByUser/" + userId
    );
    const data = await res.json();
    return data.data;
  };

  const [orderId, setOrderId] = React.useState("");
  // console.log(orderId);

  // //get orders Detail
  const [orderDetail, setOrderDetail] = React.useState("");
  useEffect(() => {
    const getOrderDetail = async () => {
      const orderDetailFromServer = await fetchOrderDetil();
      setOrderDetail(orderDetailFromServer);
    };
    getOrderDetail();
  }, [refreshing]);

  const fetchOrderDetil = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/orders/" + orderId);
    const data = await res.json();
    // console.log(data.data.merchant.name);
    return data.data;
  };

  const [rate, setRate] = React.useState(5);
  const [comment, setComment] = React.useState("");

  const data = {
    comment: comment,
    rate: rate,
  };

  const commentDone = () => {
    try {
      axios
        .post(
          "http://10.0.2.2:8000/api/v1/orders/commentAndRate/" + orderId,
          data
        )
        .then(function (response) {
          // handle success
          // console.log(JSON.stringify(response.data));
        });
      navigation.navigate("CommentSuccessfullyPage", {
        hearder: "false",
      });
    } catch (error) {
      console.log(error.message);
    }
    console.log("no");
  };

  const commentAlert = () => {
    Alert.alert("Are You Sure?", "Make Sure Your Message!", [
      { text: "Subimit", onPress: () => commentDone() },
      {
        text: "Cancel",
      },
    ]);
  };

  // console.log(orderDetail);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.sv}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText} numberOfLines={2}>
                Cleaning Johor
              </Text>
              <View style={styles.RBC}>
                <RadioButton.Group
                  onValueChange={(rate) => setRate(rate)}
                  value={rate}
                >
                  <View style={styles.radioButtonContainer}>
                    <View style={styles.row}>
                      <View style={styles.rowAndPadding}>
                        <View style={styles.radioButtonIcons}>
                          <AntDesign name="star" size={36} color="#FFEF00" />
                        </View>
                        <View style={styles.radioButton}>
                          <RadioButton value={1} />
                        </View>
                      </View>

                      <View style={styles.rowAndPadding}>
                        <View style={styles.radioButtonIcons}>
                          <AntDesign
                            name="star"
                            size={36}
                            color={rate === 1 ? "black" : "#FFEF00"}
                          />
                        </View>
                        <View style={styles.radioButton}>
                          <RadioButton value={2} />
                        </View>
                      </View>

                      <View style={styles.rowAndPadding}>
                        <View style={styles.radioButtonIcons}>
                          <AntDesign
                            name="star"
                            size={36}
                            color={
                              rate === 2 || rate === 1 ? "black" : "#FFEF00"
                            }
                          />
                        </View>
                        <View style={styles.radioButton}>
                          <RadioButton value={3} />
                        </View>
                      </View>

                      <View style={styles.rowAndPadding}>
                        <View style={styles.radioButtonIcons}>
                          <AntDesign
                            name="star"
                            size={36}
                            color={
                              rate === 3 || rate === 2 || rate === 1
                                ? "black"
                                : "#FFEF00"
                            }
                          />
                        </View>
                        <View style={styles.radioButton}>
                          <RadioButton value={4} />
                        </View>
                      </View>

                      <View style={styles.rowAndPadding}>
                        <View style={styles.radioButtonIcons}>
                          <AntDesign
                            name="star"
                            size={36}
                            color={
                              rate === 4 ||
                              rate === 3 ||
                              rate === 2 ||
                              rate === 1
                                ? "black"
                                : "#FFEF00"
                            }
                          />
                        </View>
                        <View style={styles.radioButton}>
                          <RadioButton value={5} />
                        </View>
                      </View>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  label="Comment (Optional)"
                  placeholder="Type Comment ......"
                  mode="outlined"
                  value={comment}
                  onChangeText={(comment) => setComment(comment)}
                />
              </View>
              <View style={styles.row}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    commentAlert();
                    setComment("");
                    setRate(5);
                  }}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setComment("");
                    setRate(5);
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <>
          {orders.map((order, i) => {
            return (
              <View style={styles.cardContainer} key={i}>
                <Card style={styles.cardContent}>
                  <Card.Content>
                    <View style={styles.row}>
                      <View style={styles.merchantImage}>
                        <Image
                          source={logo}
                          style={{ width: 65, height: 65 }}
                        />
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
                            order.status != null
                              ? order.status == "incomplete"
                                ? styles.buttonRed
                                : order.status == "completed"
                                ? styles.buttonGreen
                                : order.status == "pending"
                                ? styles.buttonGray
                                : null
                              : null
                          }
                        >
                          <Text style={styles.buttonTitle}>
                            {order.status != null
                              ? order.status == "incomplete"
                                ? "Incomplete"
                                : order.status == "completed"
                                ? "Completed"
                                : order.status == "pending"
                                ? "Pending"
                                : null
                              : null}
                          </Text>
                        </TouchableOpacity>
                        {order.status == "pending" && order.price != null ? (
                          <TouchableOpacity
                            style={styles.buttonYellow}
                            onPress={() =>
                              navigation.navigate("Order Confirm", {
                                order_id: order.id,
                              })
                            }
                          >
                            <Text style={styles.buttonTitle}>Payment</Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                    {order.status == "completed" && order.rate == null ? (
                      <View style={styles.CommentAndRateContaniner}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            setModalVisible(true);
                            setOrderId(order.merchant.id);
                            setRefreshing(true);
                            wait(500).then(() => setRefreshing(false));
                          }}
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
        </>
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
    maxHeight: 300,
    paddingTop: 15,
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
  buttonGray: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  buttonYellow: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#009ca7",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  buttonOpen: {
    backgroundColor: "#009ca7",
    marginRight: 10,
    marginTop: -10,
  },
  buttonClose: {
    backgroundColor: "#FF2400",
    marginLeft: 10,
    marginTop: -10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  radioButtonContainer: {
    width: 240,
    // backgroundColor: "red",
    marginBottom: 15,
  },
  radioButton: {
    elevation: 1,
    left: -36,
    bottom: -1,
    // backgroundColor: "black",
  },
  radioButtonIcons: {
    elevation: 2,
  },
  rowAndPadding: {
    flexDirection: "row",
    marginLeft: -20,
    right: -20,
  },
  RBC: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    height: 100,
    width: "90%",
  },
  commentButton: {
    flexDirection: "row",
  },
});

export default OrderViewPage;
