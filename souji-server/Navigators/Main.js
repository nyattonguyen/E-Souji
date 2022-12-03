import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useEffect } from "react/cjs/react.development";

// Stacks

import AdminNav from "./AdminNav";

// Context
import AuthGlobal from "../Context/store/AuthGlobal";

import { Colors } from "../color";
import UserNav from "./UserNav";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  // console.log(context);
  // console.log(!!context?.stateUser?.userProfile?.isAdmin);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.bluemain,
      }}
    >
      {context?.stateUser?.userProfile?.isAdmin === true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNav}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="th-list" color={color} size={30} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Users"
        component={UserNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
