import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// Stacks
import HomeNav from "./HomeNav";
import CartNav from "./CartNav";
import CartIcon from "../Shared/CartIcon";
import UserNav from "./UserNav";
import AdminNav from "./AdminNav";
import ActivityNav from "./ActivityNav";

// Context
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../Context/store/AuthGlobal";

import { Colors } from "../color";

const Tab = createBottomTabNavigator();

const Home = "Home";
const Cart = "Cart";
const Activity = "Activity";
const User = "Settings";

const Main = () => {
  const context = useContext(AuthGlobal);

  console.log(context);
  console.log(!!context?.stateUser?.userProfile?.isAdmin);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.bluemain,
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeNav}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={CartNav}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <View>
              <FontAwesome5 name="shopping-bag" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {context?.stateUser?.isAuthenticated === true ? (
        <Tab.Screen
          name="Hoạt động"
          component={ActivityNav}
          options={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarIcon: ({ color }) => (
              <>
                <Icon name="list-alt" color={color} size={30} />
                <CartIcon />
              </>
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="Cài đặt"
        component={UserNav}
        options={{
          headerShown: false,
          tabBarShowLabel: true,

          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Main;
