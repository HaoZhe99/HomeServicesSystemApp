import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderViewPage from "../order/OrderViewPage";

const NavStack = createNativeStackNavigator();

function OrderNav() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen name="OrderView" component={OrderViewPage} />
    </NavStack.Navigator>
  );
}

export default OrderNav;
