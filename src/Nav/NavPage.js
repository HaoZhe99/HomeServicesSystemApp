import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MerchantMenuPage from "../order/MerchantMenuPage";
import OrderFormPage from "../order/OrderFormPage";
import orderConfirmPage from "../order/orderConfirmPage";
import HomePage from "../HomePage";

const NavStack = createNativeStackNavigator();

function NavPage() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen name="Home" component={HomePage} />
      <NavStack.Screen name="MerchantMenuPage" component={MerchantMenuPage} />
      <NavStack.Screen name="OrderFormPage" component={OrderFormPage} />
      <NavStack.Screen name="orderConfirmPage" component={orderConfirmPage} />
    </NavStack.Navigator>
  );
}

export default NavPage;
