import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import logo from "../assets/homeIcon.png";
import { ImageSlider } from "react-native-image-slider-banner";

function HomePage({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
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
          caroselImageStyle={{ height: 150 }}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Card style={styles.category}>
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.category}>
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View>
        <Text style={styles.title}>
          The title and onPress handler are required. It is recommended to set
          accessibilityLabel to help make your app usable by everyone.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageSliderContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "90%",
  },
  categoryContainer: {
    letterSpacing: 10,
    paddingLeft: 0,
    flexDirection: "row",
  },
  category: {
    margin: 10,
    paddingLeft: 0,
    width: "33.33%",
    height: 100,
  },
  search: {
    backgroundColor: "#e4f3f4",
    width: "90%",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomePage;
