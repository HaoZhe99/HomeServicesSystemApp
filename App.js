import * as React from "react";
import { View, Text, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./src/HomePage";
import StartPage from "./src/StartPage";
import RegisterPage from "./src/RegisterPage";
import LoginPage from "./src/LoginPage";
import RegisterSuccessfulPage from "./src/RegisterSuccessfulPage";
import NavPage from "./src/Nav/NavPage";
import OrderNav from "./src/Nav/OrderNav";
import ServicerNewOrderNav from "./src/Nav/ServicerNewOrderNav";
import ServicerOldOrderNav from "./src/Nav/ServicerOldOrderNav";
import ServicerNewOrderPage from "./src/Servicer/ServicerNewOrderPage";
import ServicerCompletedOrderPage from "./src/Servicer/ServicerCompletedOrderPage";

const Tab = createBottomTabNavigator();
const NavStack = createNativeStackNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route, porps }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homes") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Proflie") {
            iconName = focused ? "ios-list-circle" : "ios-list-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          } else if (route.name === "Order") {
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
      <Tab.Screen name="Order" component={OrderNav} />
      <Tab.Screen name="Settings" component={ServicerOldOrderNav} />
      <Tab.Screen name="Proflie" component={ServicerNewOrderNav} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = React.useState("false");

  return (
    <NavigationContainer>
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
        <NavStack.Screen name="LoginPage" component={LoginPage} />
        <NavStack.Screen name="TabNav" component={TabNav} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
}
