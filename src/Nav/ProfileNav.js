import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../UserProfile/ProfilePage";
import ProfileMenu from "../UserProfile/ProfileMenu";
import AddAddressPage from "../UserProfile/AddAddressPage";
import AddPMPage from "../UserProfile/AddPMPage";
import MyAccountPage from "../UserProfile/MyAccountPage";
import UpadateSuccessFulPage from "../UserProfile/UpadateSuccessFulPage";
import OrderViewPage from "../order/OrderViewPage";

const NavStack = createNativeStackNavigator();

function ProfileNav() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen name="ProfileMenu" component={ProfileMenu} />
      <NavStack.Screen name="ProfilePage" component={ProfilePage} />
      <NavStack.Screen name="AddAddressPage" component={AddAddressPage} />
      <NavStack.Screen name="AddPMPage" component={AddPMPage} />
      <NavStack.Screen name="My Account" component={MyAccountPage} />
      <NavStack.Screen name="Order History" component={OrderViewPage} />
      <NavStack.Screen
        name="UpadateSuccessFulPage"
        component={UpadateSuccessFulPage}
        options={{ headerShown: false }}
      />
    </NavStack.Navigator>
  );
}

export default ProfileNav;
