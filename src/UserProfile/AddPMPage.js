import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Card, Title, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../component/Auth";
import MainButton from "../component/MainButton";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function AddPMPage({ navigation, route }) {
  //   fresh page function
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

  const [cards, setCard] = React.useState("");
  useEffect(() => {
    const getCard = async () => {
      if (userId != "") {
        const cardFromServer = await fetchCard();
        setCard(cardFromServer);
      }
    };
    getCard();
  }, [refreshing, userId]);

  const fetchCard = async () => {
    const res = await fetch(
      "http://10.0.2.2:8000/api/v1/cards/cardFilterByUser/" + userId
    );
    const data = await res.json();
    return data.data;
  };

  console.log(cards);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.textInputContainer}>
          <View style={styles.button}>
            <MainButton
              title="+ Add Card"
              onPress={() => navigation.navigate("AddPMFormPage")}
            />
          </View>
          {cards.length == 0
            ? null
            : cards.map((card, i) => {
                return (
                  <Card style={styles.cardContent} key={i}>
                    <Card.Content>
                      <TouchableOpacity
                        style={styles.row}
                        onPress={() =>
                          navigation.navigate("UpdatePMFormPage", {
                            card: card,
                          })
                        }
                      >
                        <View style={styles.firstIcon}>
                          <Feather name="credit-card" size={30} color="black" />
                        </View>
                        <View style={styles.text}>
                          <Paragraph>
                            {card.bank_of_card.toUpperCase()}
                          </Paragraph>
                          <Paragraph>
                            XXXX XXXX XXXX {card.card_number.substring(12, 16)}
                          </Paragraph>
                        </View>
                        <View style={styles.secondIcon}>
                          <AntDesign name="edit" size={25} color="black" />
                        </View>
                      </TouchableOpacity>
                    </Card.Content>
                  </Card>
                );
              })}
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
    marginBottom: 10,
  },
  textInputContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    minWidth: "100%",
  },
  button: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
  },
  firstIcon: {
    paddingRight: 20,
    width: "18%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "70%",
  },
  secondIcon: {
    width: "16%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddPMPage;
