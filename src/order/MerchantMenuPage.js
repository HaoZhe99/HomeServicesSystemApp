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
import { AntDesign } from "@expo/vector-icons";
import MainButton from "../component/MainButton";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function MerchantMenuPage({ navigation }) {
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
          <Text style={styles.menuText}>Services</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.cardContent}>
              <Card.Content>
                <View style={styles.row}>
                  <View style={styles.cardDetail}>
                    <Title>ABC Company</Title>
                    <Paragraph>House Cleaning</Paragraph>
                    <View style={styles.cardInner}>
                      <View style={styles.cardRating}>
                        <Paragraph>Rating</Paragraph>
                        <Paragraph>
                          <AntDesign name="star" size={14} color="black" />
                          5.0
                        </Paragraph>
                      </View>
                      <View style={styles.cardPrice}>
                        <Paragraph>Price</Paragraph>
                        <Paragraph>$20/h</Paragraph>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardButton}>
                    <View style={styles.button}>
                      <MainButton
                        title="Book"
                        onPress={() => navigation.navigate("OrderFormPage")}
                      />
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.cardContent}>
              <Card.Content>
                <View style={styles.row}>
                  <View style={styles.cardDetail}>
                    <Title>ABC Company</Title>
                    <Paragraph>House Cleaning</Paragraph>
                    <View style={styles.cardInner}>
                      <View style={styles.cardRating}>
                        <Paragraph>Rating</Paragraph>
                        <Paragraph>
                          <AntDesign name="star" size={14} color="black" />
                          5.0
                        </Paragraph>
                      </View>
                      <View style={styles.cardPrice}>
                        <Paragraph>Price</Paragraph>
                        <Paragraph>$20/h</Paragraph>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardButton}>
                    <View style={styles.button}>
                      <MainButton title="Book" />
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.cardContent}>
              <Card.Content>
                <View style={styles.row}>
                  <View style={styles.cardDetail}>
                    <Title>ABC Company</Title>
                    <Paragraph>House Cleaning</Paragraph>
                    <View style={styles.cardInner}>
                      <View style={styles.cardRating}>
                        <Paragraph>Rating</Paragraph>
                        <Paragraph>
                          <AntDesign name="star" size={14} color="black" />
                          5.0
                        </Paragraph>
                      </View>
                      <View style={styles.cardPrice}>
                        <Paragraph>Price</Paragraph>
                        <Paragraph>$20/h</Paragraph>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardButton}>
                    <View style={styles.button}>
                      <MainButton title="Book" />
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
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
    width: "60%",
    height: 100,
    borderRightWidth: 1,
    borderRightColor: "black",
    // backgroundColor: "black",
  },
  cardInner: {
    flexDirection: "row",
    minWidth: "100%",
  },
  cardRating: {},
  cardPrice: { left: "100%" },
  cardButton: {
    width: "40%",
    minHeight: 100,
    // backgroundColor: "red",
  },
  button: {
    bottom: -50,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MerchantMenuPage;
