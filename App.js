import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/HomePage";
import StartPage from "./src/StartPage";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Home Page"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("HomePage");
        }}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  /* 2. Get the param */
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();
{
  /* //   <Stack.Navigator initialRouteName="StartPage">
    //     <Stack.Screen name="StartPage" component={StartPage} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="HomePage" component={HomePage} />
    //     <Stack.Screen name="Details" component={DetailsScreen} />
    //   </Stack.Navigator> */
}
function App() {
  return (
    <NavigationContainer>
      <StartPage />
    </NavigationContainer>
  );
}

export default App;
