import React from "react";
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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function ProfileMenu(props) {
  //   fresh page function
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
              }}
            >
              Username
            </Text>
            <Text
              style={{
                fontSize: 14,
              }}
              numberOfLines={1}
            >
              example@gmail.com
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
            <View style={styles.contentList}>
              <SimpleLineIcons
                name="logout"
                size={24}
                color="black"
                style={{ paddingRight: 10, paddingBottom: 5 }}
              />
              <Text>Log Out</Text>
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
  },
  contentContainer: {
    margin: 50,
    padding: 60,
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
