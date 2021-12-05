import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicerNewOrderPage from "../Servicer/ServicerNewOrderPage";
import ServicerOrderDetailPage from "../Servicer/ServicerOrderDetailPage";
import OrderCompletedSuccessfully from "../Servicer/OrderCompletedSuccessfully";

const NavStack = createNativeStackNavigator();

function ServicerNewOrderNav() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen
        name="ServicerNewOrderPage"
        component={ServicerNewOrderPage}
      />
      <NavStack.Screen
        name="ServicerOrderDetailPage"
        component={ServicerOrderDetailPage}
      />
      <NavStack.Screen
        name="OrderCompletedSuccessfully"
        component={OrderCompletedSuccessfully}
        options={{ headerShown: false }}
      />
    </NavStack.Navigator>
  );
}

export default ServicerNewOrderNav;
