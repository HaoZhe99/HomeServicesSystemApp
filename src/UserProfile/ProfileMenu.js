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
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../component/Auth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function ProfileMenu({ navigation, route }) {
  const auth = useContext(Auth)
  //   fresh page function
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.contentContainer}>
          <View style={styles.profileContent}>
            <Ionicons name="person-circle-outline" size={80} color="#009ca7" />
            <Text
              style={{
                fontSize: 20,
                paddingBottom: 5,
              }}
            >
              {users.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
              }}
              numberOfLines={1}
            >
              {users.email}
            </Text>
          </View>
          <View style={styles.contentListContanier}>
            <View style={styles.contentList}>
              <Ionicons
                name="person-outline"
                size={24}
                color="black"
                style={{ paddingRight: 10, paddingBottom: 5 }}
              />
              <Text>My Account</Text>
            </View>
            <View style={styles.contentList}>
              <MaterialCommunityIcons
                name="history"
                size={24}
                color="black"
                style={{ paddingRight: 10, paddingBottom: 5 }}
              />
              <Text>History</Text>
            </View>
            <View style={styles.contentList}>
              <Ionicons
                name="md-settings-outline"
                size={24}
                color="black"
                style={{ paddingRight: 10, paddingBottom: 5 }}
              />
              <Text>Settings</Text>
            </View>
            <TouchableOpacity
              style={styles.contentList}
              onPress={async () => {
                await clearAll();

                auth("false");
                // setRefreshing(true);
                // wait(2000).then(() => setRefreshing(false));
              }}
            >
              <SimpleLineIcons
                name="logout"
                size={24}
                color="black"
                style={{ paddingRight: 10, paddingBottom: 5 }}
              />
              <Text>Log Out</Text>
            </TouchableOpacity>
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
  },
  contentContainer: {
    margin: 50,
    padding: 80,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#009ca7",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  profileContent: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  contentList: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    padding: 10,
  },
});

export default ProfileMenu;
