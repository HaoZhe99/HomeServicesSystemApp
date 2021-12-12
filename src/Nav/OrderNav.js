import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderViewPage from "../order/OrderViewPage";
import CommentSuccessfullyPage from "../order/CommentSuccessfullyPage";

const NavStack = createNativeStackNavigator();

function OrderNav() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen name="OrderView" component={OrderViewPage} />
      <NavStack.Screen
        name="CommentSuccessfullyPage"
        component={CommentSuccessfullyPage}
        options={{ headerShown: false }}
      />
    </NavStack.Navigator>
  );
}

export default OrderNav;
