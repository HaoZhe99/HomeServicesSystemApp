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
import ServicerNewOrderPage from "./src/Servicer/ServicerNewOrderPage";
import ServicerCompletedOrderPage from "./src/Servicer/ServicerCompletedOrderPage";

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, porps }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Homes") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Proflie") {
              iconName = focused
                ? "ios-list-circle"
                : "ios-list-circle-outline";
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
        <Tab.Screen
          name="Settings"
          component={ServicerCompletedOrderPage}
          options={{
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="Proflie"
          component={ServicerNewOrderPage}
          options={{
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
