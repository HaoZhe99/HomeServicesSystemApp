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
import { Card, TextInput, Paragraph } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../component/Auth";
import MainButton from "../component/MainButton";
import axios from "axios";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function AddAddressFormPage({ navigation, route }) {
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

  const [address, setAddress] = React.useState("");
  const [state_id, setState_id] = React.useState("");
  const [sss, setSss] = React.useState("");

  const data = {
    address: address,
    state_id: state_id,
    created_by_id: userId,
  };

  const updateProfile = () => {
    try {
      axios
        .post(
          "http://10.0.2.2:8000/api/v1/users/userAddAddress/" + userId,
          data
        )
        .then(function (response) {
          // handle success
          console.log(JSON.stringify(response.data));
        });
      navigation.navigate("UpadateSuccessFulPage", {
        hearder: "false",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const [s, setS] = React.useState("");
  useEffect(() => {
    const getS = async () => {
      const sFromServer = await fetchS();
      setS(sFromServer);
    };
    getS();
  }, [refreshing]);

  const fetchS = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/states");
    const data = await res.json();
    // console.log(data.data[0]);
    return data.data;
  };

  const [area, setArea] = React.useState("");
  //   useEffect(() => {
  //     const getArea = async () => {
  //       const areaFromServer = await fetchArea();
  //       setArea(areaFromServer);
  //     };
  //     getArea();
  //   }, [refreshing]);

  //   const fetchArea = async () => {
  //     const res = await fetch(
  //       "http://10.0.2.2:8000/api/v1/states/chooseArea/" + state_id
  //     );
  //     const data = await res.json();
  //     setArea(data.data[0]);
  //     return data.data;
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.textInputContainer}>
          <View style={styles.textInput}>
            <Text style={{ color: "#009ca7" }}>Address</Text>
            <TextInput
              value={address}
              onChangeText={(address) => setAddress(address)}
              mode="outlined"
              placeholder="Address"
              placeholderTextColor="black"
              activeOutlineColor="#009ca7"
            />
          </View>
          <View style={styles.textInput}>
            <Text style={styles.text}>Postcode</Text>
            <View style={styles.picker}>
              <Picker
                style={styles.pickerInner}
                selectedValue={state_id}
                onValueChange={(itemValue) => setState_id(itemValue)}
              >
                <Picker.Item label="Select Postcode" value="" />
                {s.length == 0
                  ? null
                  : s.map((ss, i) => {
                      return <Picker.Item label={ss} value={ss} key={i} />;
                    })}
              </Picker>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.pickerContaniner}>
              <Text style={{ color: "#009ca7" }}>Area</Text>
              <TextInput
                value={area}
                onChangeText={(area) => setArea(area)}
                mode="outlined"
                disabled="true"
                placeholder="Area"
                placeholderTextColor="black"
                activeOutlineColor="#009ca7"
              />
            </View>
            <View style={styles.pickerContaniner}>
              <Text style={{ color: "#009ca7" }}>State</Text>
              <TextInput
                value={sss}
                onChangeText={(sss) => setSss(sss)}
                mode="outlined"
                disabled="true"
                placeholder="State"
                placeholderTextColor="black"
                activeOutlineColor="#009ca7"
              />
            </View>
          </View>
          <View style={styles.button}>
            <MainButton title="Add Address" onPress={() => updateProfile()} />
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
    backgroundColor: "white",
  },
  textInputContainer: {
    marginLeft: 50,
    marginRight: 50,
  },
  textInput: {
    minWidth: "100%",
    marginTop: 20,
  },
  text: {
    width: "80%",
    paddingBottom: 5,
    fontSize: 12,
    color: "#009ca7",
  },
  picker: {
    maxWidth: "100%",
    height: 60,
    borderColor: "#a6a6a6",
    borderRadius: 5,
    borderWidth: 1.5,
    backgroundColor: "#f6f6f6",
    // marginBottom: 20,
  },
  pickerInner: {
    // top: -5,
    // left: 5,
  },
  row: {
    flexDirection: "row",
  },
  pickerContaniner: {
    minWidth: "47%",
    marginTop: 20,
    marginRight: 15,
  },
  button: {
    marginTop: 40,
  },
});

export default AddAddressFormPage;
