import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import { Card, TextInput, Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../component/Auth";
import MainButton from "../component/MainButton";
import axios from "axios";
import card from "../../assets/card.jpg";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function AddPMFormPage({ navigation, route }) {
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
    return data.data.addresses;
  };

  const [bank, setBank] = React.useState("");
  const [nameOfCard, setNameOfCard] = React.useState("");
  const [cardNumber, setCardNumbesr] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  const data = {
    bank_of_card: bank,
    name_of_card: nameOfCard,
    card_number: cardNumber,
    expired_date: dueDate,
    cvv: cvv,
    user_id: userId,
  };

  const AddCard = () => {
    try {
      axios
        .post("http://10.0.2.2:8000/api/v1/cards", data)
        .then(function (response) {
          // handle success
          console.log(JSON.stringify(response.data));
        });
      navigation.navigate("AddSuccessFulPage", {
        hearder: "false",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.formContainer}>
          <View style={styles.ImageContainer}>
            <Image
              source={card}
              style={{ width: 210, height: 130, borderRadius: 10 }}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Bank of Card</Text>
            <View style={styles.picker}>
              <Picker
                style={styles.pickerInner}
                selectedValue={bank}
                onValueChange={(itemValue, itemIndex) => setBank(itemValue)}
              >
                <Picker.Item label="Select Bank" value="" color="#a6a6a6" />
                <Picker.Item label="HongLeong Bank" value="hongleongBank" />
                <Picker.Item label="MayBank" value="mayBank" />
                <Picker.Item label="Public Bank" value="publicBank" />
                <Picker.Item label="CIMB Bank" value="cimbBank" />
                <Picker.Item label="RHB Bank" value="rhbBank" />
              </Picker>
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Name on Card</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name on Card"
              placeholderTextColor="#a6a6a6"
              mode="outlined"
              activeOutlineColor="#009ca7"
              value={nameOfCard}
              onChangeText={(nameOfCard) => setNameOfCard(nameOfCard)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Card Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="XXXX XXXX XXXX XXXX"
              placeholderTextColor="#a6a6a6"
              mode="outlined"
              maxLength={16}
              activeOutlineColor="#009ca7"
              value={cardNumber}
              onChangeText={(cardNumber) => setCardNumbesr(cardNumber)}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.textInputRowContainer}>
              <Text style={styles.text}>Expiration</Text>
              <TextInput
                style={styles.textInput}
                placeholder="MM / YY"
                placeholderTextColor="#a6a6a6"
                mode="outlined"
                activeOutlineColor="#009ca7"
                maxLength={5}
                value={
                  dueDate == null || dueDate == ""
                    ? null
                    : dueDate.length == 4
                    ? dueDate.substring(0, 2) + "/" + dueDate.substring(2, 4)
                    : null
                }
                onChangeText={(dueDate) => setDueDate(dueDate)}
              />
            </View>
            <View style={styles.textInputRowContainer}>
              <View style={styles.row}>
                <Text style={styles.text}>CVV</Text>
                <AntDesign name="questioncircle" size={22} color="black" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="XXX"
                placeholderTextColor="#a6a6a6"
                maxLength={3}
                mode="outlined"
                activeOutlineColor="#009ca7"
                value={cvv}
                onChangeText={(cvv) => setCvv(cvv)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.ButtonContainer}>
            <MainButton title="Add Card" onPress={() => AddCard()} />
          </TouchableOpacity>
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
    backgroundColor: "white",
  },
  ImageContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  formContainer: { paddingTop: 20 },
  textInputContainer: {
    minWidth: "100%",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
    maxHeight: 70,
  },
  textInputRowContainer: {
    minWidth: "50%",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
    maxHeight: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 10,
    color: "#009ca7",
  },
  textInput: {
    height: 30,
    backgroundColor: "#FFFFFF",
    borderColor: "#a6a6a6",
  },
  picker: {
    width: "100%",
    height: 30,
    borderColor: "#a6a6a6",
    borderRadius: 5,
    borderWidth: 1.5,
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    color: "#a6a6a6",
    marginBottom: 5,
  },
  pickerInner: {
    top: -13,
    left: 5,
  },
  ButtonContainer: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,
  },
});

export default AddPMFormPage;
