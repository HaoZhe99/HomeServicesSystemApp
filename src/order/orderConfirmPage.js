import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MainButton from "../component/MainButton";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function orderConfirmPage({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.menuContainer}>
          <Text style={styles.menuText}>Booking Confirmation</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.cardContent}>
              <Card.Content>
                <View style={styles.cardDetail}>
                  <Paragraph style={styles.paragraph}>Order Review</Paragraph>
                  <View style={styles.cardInner}>
                    <View style={styles.textInner}>
                      <Entypo name="shop" size={16} color="black" />
                      <Text style={styles.text}>ABC Company</Text>
                    </View>
                    <View style={styles.textInner}>
                      <Ionicons name="location" size={16} color="black" />
                      <Text style={styles.text}>Address</Text>
                    </View>
                    <View style={styles.textInner}>
                      <Feather name="clock" size={16} color="black" />
                      <Text style={styles.text}>date at time</Text>
                    </View>
                    <View style={styles.textInner}>
                      <MaterialIcons
                        name="attach-money"
                        size={16}
                        color="black"
                      />
                      <Text style={styles.text}>Price</Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.button}>
            <MainButton title="Booking" />
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
    alignSelf: "flex-start",
    paddingLeft: 35,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 25,
  },
  paragraph: {
    color: "#009ca7",
    fontFamily: "notoserif",
  },
  cardContainer: {
    width: "93%",
    paddingBottom: 10,
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
    width: "90%",
    height: 200,
    // backgroundColor: "black",
  },
  cardInner: {
    minWidth: "100%",
    paddingTop: 10,
  },
  textInner: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    top: -3,
    paddingLeft: 10,
  },
  button: {
    minWidth: "90%",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default orderConfirmPage;
