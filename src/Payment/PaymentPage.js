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
import { TextInput, Checkbox } from "react-native-paper";
import MainButton from "../component/MainButton";
import { AntDesign } from "@expo/vector-icons";
import card from "../../assets/card.jpg";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function PaymentPage({ navigation, route }) {
  // fresh page function
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [bank, setBank] = React.useState("");
  const [nameOfCard, setNameOfCard] = React.useState("");
  const [cardNumber, setCardNumbesr] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  const payment = () => {
    if (checked == true) {
      navigation.navigate("orderConfirmPage", {
        date: route.params.date,
        time: route.params.time,
        payment_method: route.params.payment_method,
        location: route.params.location,
        package: route.params.package,
        merchant_id: route.params.merchant_id,
        merchant_name: route.params.merchant_name,
        bank_of_card: bank,
        name_of_card: nameOfCard,
        card_number: cardNumber,
        expired_date: dueDate,
        cvv: cvv,
      });
    } else {
      navigation.navigate("orderConfirmPage", {
        date: route.params.date,
        time: route.params.time,
        payment_method: route.params.payment_method,
        location: route.params.location,
        package: route.params.package,
        merchant_id: route.params.merchant_id,
        merchant_name: route.params.merchant_name,
      });
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
          <View style={styles.CheckboxContainer}>
            <View style={styles.row}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={styles.checkBoxText}>Save Card</Text>
            </View>
          </View>
          <View style={styles.textInputRowContainer}>
            <Text style={styles.bottomText}>
              Your card won't be changed until
            </Text>
            <Text style={styles.bottomText}>you review your order.</Text>
          </View>
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => payment()}
          >
            <MainButton title="Next Review Order" />
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
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
  },
  formContainer: { paddingTop: 10 },
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
  bottomText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  ImageContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
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
    paddingLeft: 25,
    paddingRight: 25,
  },
  CheckboxContainer: {
    minWidth: "100%",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
    maxHeight: 90,
  },
  checkBoxText: {
    top: 8,
  },
});

export default PaymentPage;
