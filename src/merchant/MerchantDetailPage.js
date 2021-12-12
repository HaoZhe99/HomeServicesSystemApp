import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import MainButton from "../component/MainButton";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function MerchantDetailPage({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
  // console.log(merchants.state);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>{merchants.name}</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.cardContent}>
              <Card.Content>
                <View style={styles.row}>
                  <View style={styles.cardDetail}>
                    <View>
                      <Paragraph style={styles.cardTitlle}>
                        Services Type
                      </Paragraph>
                      <Paragraph>
                        {merchants.categories == undefined
                          ? null
                          : merchants.categories[0].name}
                      </Paragraph>
                    </View>
                    <View style={styles.cardInner}>
                      <View>
                        <Paragraph style={styles.cardTitlle}>Rating</Paragraph>
                        <Paragraph>
                          <AntDesign
                            name="star"
                            size={14}
                            color="#FFEF00"
                            marginRight={10}
                          />
                          5
                        </Paragraph>
                      </View>
                      <View style={styles.cardPrice}>
                        <Paragraph style={styles.cardTitlle}>Price</Paragraph>
                        <Paragraph>$20/h</Paragraph>
                      </View>
                    </View>
                    <View>
                      <Paragraph style={styles.cardTitlle}>
                        Contact Number
                      </Paragraph>
                      <Paragraph>{merchants.contact_number}</Paragraph>
                    </View>
                    <View>
                      <Paragraph style={styles.cardTitlle}>Address</Paragraph>
                      <Paragraph>
                        {merchants.address},
                        {merchants.state == undefined
                          ? null
                          : merchants.state.area}
                        ,
                        {merchants.state == undefined
                          ? null
                          : merchants.state.postcode}
                        ,
                        {merchants.state == undefined
                          ? null
                          : merchants.state.state}
                      </Paragraph>
                    </View>
                    <View>
                      <Paragraph style={styles.cardTitlle}>
                        Description
                      </Paragraph>
                      <Paragraph>{merchants.description}</Paragraph>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
            <View style={styles.button}>
              <MainButton
                title="Book Now"
                onPress={() =>
                  navigation.navigate("OrderFormPage", {
                    merchant_id: merchants.id,
                    merchant_name: merchants.name,
                  })
                }
              />
            </View>
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
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 20,
  },
  cardContainer: {
    width: "90%",
    maxHeight: 1000,
  },
  cardTitlle: {
    color: "#009ca7",
    fontSize: 15,
    fontWeight: "bold",
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
    width: "100%",
    maxHeight: 500,
    marginBottom: -80,
  },
  cardInner: {
    flexDirection: "row",
    minWidth: "100%",
  },
  cardPrice: { left: "100%" },
  cardButton: {
    width: "40%",
    minHeight: 100,
  },
  button: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MerchantDetailPage;
