import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicerCompletedOrderPage from "../Servicer/ServicerCompletedOrderPage";
import ServicerOrderDetailPage from "../Servicer/ServicerOrderDetailPage";

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
      <NavStack.Screen
        name="ServicerOrderDetailPage"
        component={ServicerOrderDetailPage}
      />
    </NavStack.Navigator>
  );
}

export default ServicerOldOrderNav;
