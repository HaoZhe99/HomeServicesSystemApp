import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../UserProfile/ProfilePage";
import ProfileMenu from "../UserProfile/ProfileMenu";
import AddAddressPage from "../UserProfile/AddAddressPage";
import AddPMPage from "../UserProfile/AddPMPage";
import MyAccountPage from "../UserProfile/MyAccountPage";
import UpadateSuccessFulPage from "../UserProfile/UpadateSuccessFulPage";
import OrderViewPage from "../order/OrderViewPage";
import AddAddressFormPage from "../UserProfile/AddAddressFormPage";
import UpdateAddressFormPage from "../UserProfile/UpdateAddressFormPage";
import AddPMFormPage from "../UserProfile/AddPMFormPage";
import UpdatePMFormPage from "../UserProfile/UpdatePMFormPage";
import AddSuccessFulPage from "../UserProfile/AddSuccessFulPage";


const NavStack = createNativeStackNavigator();

function ProfileNav() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NavStack.Screen name="Profile Menu" component={ProfileMenu} />
      <NavStack.Screen name="Profile Page" component={ProfilePage} />
      <NavStack.Screen name="Add Address Page" component={AddAddressPage} />
      <NavStack.Screen name="Add Payment Method" component={AddPMPage} />
      <NavStack.Screen name="My Account" component={MyAccountPage} />
      <NavStack.Screen name="Order History" component={OrderViewPage} />
      <NavStack.Screen
        name="Add Address Form"
        component={AddAddressFormPage}
      />
      <NavStack.Screen
        name="Update Address Form"
        component={UpdateAddressFormPage}
      />
      <NavStack.Screen name="Add Payment Method Form" component={AddPMFormPage} />
      <NavStack.Screen name="Update Payment Method Form" component={UpdatePMFormPage} />
      <NavStack.Screen
        name="UpadateSuccessFulPage"
        component={UpadateSuccessFulPage}
        options={{ headerShown: false }}
      />
      <NavStack.Screen
        name="AddSuccessFulPage"
        component={UpadateSuccessFulPage}
        options={{ headerShown: false }}
      />
    </NavStack.Navigator>
  );
}

export default ProfileNav;
