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
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../component/Auth";
import MainButton from "../component/MainButton";
import axios from "axios";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function ProfilePage({ navigation, route }) {
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
    return data.data;
  };

  const [name, setName] = React.useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const data = {
    name: name == "" ? users.name : name,
    username: username == "" ? users.username : username,
    email: email == "" ? users.email : email,
    phone: phone == "" ? users.phone : phone,
  };

  const updateProfile = () => {
    try {
      axios
        .post("http://10.0.2.2:8000/api/v1/users/userUpdate/" + userId, data)
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.personIcon}>
          <Ionicons name="person-circle-outline" size={100} color="#009ca7" />
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.textInput}>
            <Text>Name</Text>
            <TextInput
              value={name}
              onChangeText={(name) => setName(name)}
              mode="outlined"
              placeholder={users.name}
              placeholderTextColor="black"
              activeOutlineColor="#009ca7"
            />
          </View>
          <View style={styles.textInput}>
            <Text>Username</Text>
            <TextInput
              value={username}
              onChangeText={(username) => setUsername(username)}
              mode="outlined"
              placeholder={users.username}
              placeholderTextColor="black"
              activeOutlineColor="#009ca7"
            />
          </View>
          <View style={styles.textInput}>
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={(email) => setEmail(email)}
              mode="outlined"
              placeholder={users.email}
              placeholderTextColor="black"
              activeOutlineColor="#009ca7"
            />
          </View>
          <View style={styles.textInput}>
            <Text>Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
              mode="outlined"
              placeholder={users.phone}
              placeholderTextColor="black"
              activeOutlineColor="#009ca7"
            />
          </View>
          <View style={styles.button}>
            <MainButton title="Submit" onPress={() => updateProfile()} />
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
  personIcon: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: -20,
  },
  button: {
    marginTop: 20,
  },
});

export default ProfilePage;
