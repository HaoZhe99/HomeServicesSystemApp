import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MerchantMenuPage from "../order/MerchantMenuPage";
import OrderFormPage from "../order/OrderFormPage";
import orderConfirmPage from "../order/orderConfirmPage";
import HomePage from "../HomePage";
import OrderSuccefullyPage from "../order/OrderSuccefullyPage";
import PaymentSuccefullyPage from "../order/PaymentSuccefullyPage";
import MerchantDetailPage from "../merchant/MerchantDetailPage";
import PaymentPage from "../Payment/PaymentPage";
import { StyleSheet } from "react-native";
import OrderNav from "./OrderNav";

const NavStack = createNativeStackNavigator();

function NavPage({ navigation }) {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen name="Home" component={HomePage} />
      <NavStack.Screen
        name="Merchant Detail"
        component={MerchantDetailPage}
      />
      <NavStack.Screen name="Merchant Menu" component={MerchantMenuPage} />
      <NavStack.Screen name="Order Form" component={OrderFormPage} />
      <NavStack.Screen name="Order Confirm" component={orderConfirmPage} />
      <NavStack.Screen name="Payment" component={PaymentPage} />
      <NavStack.Screen
        options={{ headerShown: false }}
        name="OrderSuccefullyPage"
        component={OrderSuccefullyPage}
      />
      <NavStack.Screen
        options={{ headerShown: false }}
        name="PaymentSuccefullyPage"
        component={PaymentSuccefullyPage}
      />
      <NavStack.Screen
        name="OrderNav"
        component={OrderNav}
        options={{
          headerShown: false,
        }}
      />
    </NavStack.Navigator>
  );
}

const styles = StyleSheet.create({
  hearder: {
    marginRight: 10,
  },
});

export default NavPage;
