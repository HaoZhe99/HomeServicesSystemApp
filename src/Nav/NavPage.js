import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MerchantMenuPage from "../order/MerchantMenuPage";
import OrderFormPage from "../order/OrderFormPage";
import orderConfirmPage from "../order/orderConfirmPage";
import HomePage from "../HomePage";
import OrderSuccefullyPage from "../order/OrderSuccefullyPage";
import MerchantDetailPage from "../merchant/MerchantDetailPage";
import PaymentPage from "../Payment/PaymentPage";
import { StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ServicerNewOrderPage from "../Servicer/ServicerNewOrderPage";
import OrderNav from "./OrderNav";
import ProfileMenu from "../UserProfile/ProfileMenu";

const NavStack = createNativeStackNavigator();

function NavPage({ navigation }) {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.hearder}
              onPress={() => navigation.navigate("ProfileMenu")}
            >
              <Ionicons
                name="person-circle-outline"
                size={36}
                color="#009ca7"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NavStack.Screen
        name="MerchantDetailPage"
        component={MerchantDetailPage}
      />
      <NavStack.Screen name="MerchantMenuPage" component={MerchantMenuPage} />
      <NavStack.Screen name="OrderFormPage" component={OrderFormPage} />
      <NavStack.Screen name="orderConfirmPage" component={orderConfirmPage} />
      <NavStack.Screen name="PaymentPage" component={PaymentPage} />
      <NavStack.Screen
        options={{ headerShown: false }}
        name="OrderSuccefullyPage"
        component={OrderSuccefullyPage}
      />
      <NavStack.Screen
        name="OrderNav"
        component={OrderNav}
        options={{
          headerShown: false,
        }}
      />
      <NavStack.Screen name="ProfileMenu" component={ProfileMenu} />
    </NavStack.Navigator>
  );
}

const styles = StyleSheet.create({
  hearder: {
    marginRight: 10,
  },
});

export default NavPage;
