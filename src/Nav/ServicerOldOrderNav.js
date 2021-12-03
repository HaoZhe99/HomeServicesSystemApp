import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicerCompletedOrderPage from "../Servicer/ServicerCompletedOrderPage";

const NavStack = createNativeStackNavigator();

function ServicerOldOrderNav() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen
        name="ServicerCompletedOrderPage"
        component={ServicerCompletedOrderPage}
      />
    </NavStack.Navigator>
  );
}

export default ServicerOldOrderNav;
