import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import StartPage from "./src/StartPage";
import RegisterPage from "./src/RegisterPage";
import LoginPage from "./src/LoginPage";
import RegisterSuccessfulPage from "./src/RegisterSuccessfulPage";
import NavPage from "./src/Nav/NavPage";
import OrderNav from "./src/Nav/OrderNav";
import ServicerNewOrderNav from "./src/Nav/ServicerNewOrderNav";
import ServicerOldOrderNav from "./src/Nav/ServicerOldOrderNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileNav from "./src/Nav/ProfileNav";
import { Auth } from "./src/component/Auth";

const Tab = createBottomTabNavigator();
const NavStack = createNativeStackNavigator();

export default function App({ route }) {
  // const auth = useContext(Auth)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [data, setData] = React.useState("false");
  const [roleId, setRoleId] = React.useState("");

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("1");
      return JSON.parse(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   if (userId == "") return;
  getData().then((T) => {
    T == null ? setData("false") : setData("true");
    T != null
      ? T.roles[0].id != null
        ? setRoleId(T.roles[0].id)
        : setRoleId("")
      : null;
    // T != null ? console.log(T.roles[0].id) : null;
  });
  // }, [refreshing, userId]);

  const HOmeNav = () => (
    <Tab.Navigator
      screenOptions={({ route, porps }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homes") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "History") {
            iconName = focused ? "ios-receipt" : "ios-receipt-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#009ca7",
        tabBarInactiveTintColor: "black",
        headerTitleAlign: "center",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Homes" component={NavPage} />
      <Tab.Screen name="History" component={OrderNav} />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        initialParams={{ setData: setData }}
      />
    </Tab.Navigator>
  );

  const ServicerNav = () => (
    <Tab.Navigator
      screenOptions={({ route, porps }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Completed Order") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name === "Incomplete Order") {
            iconName = focused ? "close-circle" : "close-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#009ca7",
        tabBarInactiveTintColor: "black",
        headerTitleAlign: "center",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Incomplete Order" component={ServicerNewOrderNav} />
      <Tab.Screen name="Completed Order" component={ServicerOldOrderNav} />
      <Tab.Screen name="Profile" component={ProfileNav} />
    </Tab.Navigator>
  );

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const StartStack = () => (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <NavStack.Screen name="StartPage" component={StartPage} />
      <NavStack.Screen name="RegisterPage" component={RegisterPage} />
      <NavStack.Screen
        name="RegisterSuccessfulPage"
        component={RegisterSuccessfulPage}
      />
      <NavStack.Screen
        name="LoginPage"
        component={LoginPage}
        initialParams={{ setData: setData }}
      />
    </NavStack.Navigator>
  );
  console.log(data);

  return (
    <Auth.Provider value={setData}>
      <NavigationContainer>
        {data == "true" ? (
          roleId == "4" ? (
            <ServicerNav />
          ) : (
            <HOmeNav />
          )
        ) : (
          <StartStack />
        )}
      </NavigationContainer>
    </Auth.Provider>
  );
}
