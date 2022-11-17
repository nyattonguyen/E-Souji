import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screen
import Cart from "../Screens/Cart/Cart";
import CheckoutNav from "./CheckoutNav";
import HomeNav from "./HomeNav";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutNav}
        options={{
          headerShown: false,
          title: "Checkout",
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeNav}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function CartNav() {
  return <MyStack />;
}
