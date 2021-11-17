import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MerchantMenuPage from "../order/MerchantMenuPage";
import HomePage from "../HomePage";

const NavStack = createNativeStackNavigator();

function NavPage() {
  return (
    <NavStack.Navigator>
      <NavStack.Screen name="Home" component={HomePage} />
      <NavStack.Screen name="MerchantMenuPage" component={MerchantMenuPage} />
    </NavStack.Navigator>
  );
}

export default NavPage;
