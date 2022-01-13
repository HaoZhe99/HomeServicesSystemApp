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
        name="Servicer Completed Order"
        component={ServicerCompletedOrderPage}
      />
      <NavStack.Screen
        name="Servicer Order Detail"
        component={ServicerOrderDetailPage}
      />
    </NavStack.Navigator>
  );
}

export default ServicerOldOrderNav;
