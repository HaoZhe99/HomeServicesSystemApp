import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import logo from "../assets/homeIcon.png";
import { ImageSlider } from "react-native-image-slider-banner";
import axios from "axios";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomePage({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  // fresh page function
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // category get request
  const [categorys, setCategory] = React.useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const categoryFromServer = await fetchCategory();
      setCategory(categoryFromServer);
    };
    getCategory();
  }, []);

  const fetchCategory = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/categories");
    const data = await res.json();
    return data.data;
  };

  // category random get request
  const [categoryRandom, setCategoryRandom] = React.useState("");
  useEffect(() => {
    const getCategoryRandom = async () => {
      const categoryFromServer = await fetchCategoryRandom();
      setCategoryRandom(categoryFromServer);
    };
    getCategoryRandom();
  }, []);

  const fetchCategoryRandom = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/v1/merchants/randomShow");
    const data = await res.json();
    console.log(data.data);
    return data.data;
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.searchContainer}>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>

        <View style={styles.imageSliderContainer}>
          <ImageSlider
            data={[
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
              },
              {
                img: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
              },
              {
                img: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
              },
            ]}
            autoPlay={false}
            onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
            caroselImageStyle={{ height: 170 }}
          />
        </View>

        <View style={styles.categoryContainer}>
          <>
            {categorys.map((category, i) => {
              return (
                <Card
                  key={i}
                  style={styles.category}
                  onPress={() => navigation.navigate("MerchantMenuPage")}
                >
                  <Card.Content>
                    <View style={styles.ImageContainer}>
                      <Image source={logo} style={{ width: 50, height: 50 }} />
                    </View>
                    <Title key="{index}" style={styles.cardText}>
                      {category.name}
                    </Title>
                  </Card.Content>
                </Card>
              );
            })}
          </>
        </View>

        <View style={styles.companyDetailsContainer}>
          <Image source={logo} style={{ width: 120, height: 120 }} />
          <View style={styles.companyDetailsText}>
            <Paragraph style={styles.paragraph}>Service Description</Paragraph>
            <Text style={styles.paragraphDetail} numberOfLines={8}>
              {categoryRandom.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  paragraph: {
    alignSelf: "flex-start",
    color: "#009ca7",
    fontFamily: "notoserif",
    fontSize: 14,
  },
  paragraphDetail: {
    height: 80,
    color: "black",
  },
  searchContainer: {
    backgroundColor: "#F0F0F0",
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageSliderContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  ImageContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryContainer: {
    flexWrap: "wrap",
    letterSpacing: 10,
    paddingLeft: 0,
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  companyDetailsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  companyDetailsText: {
    margin: 15,
    maxWidth: 190,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    margin: "1%",
    paddingLeft: 0,
    width: "29%",
    height: 100,
    backgroundColor: "#e4f3f4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  search: {
    backgroundColor: "#e4f3f4",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  cardText: {
    fontSize: 13,
    textAlign: "center",
  },
});

export default HomePage;
