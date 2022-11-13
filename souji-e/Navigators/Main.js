import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useEffect } from "react/cjs/react.development";

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

const Main = () => {
  const context = useContext(AuthGlobal);

  console.log(context);
  // console.log(context.stateUser.userProfile.isAdmin);
  console.log(!!context?.stateUser?.userProfile?.isAdmin);
  // useEffect(() => {
  //   AsyncStorage.getItem("jwt")
  //       .then((res) => {
  //         axios
  //           .get(`${baseURL}users/${context.stateUser.user.id}`, {
  //             headers: { Authorization: `Bearer ${res}`}
  //           })
  //           .then((user) =>
  //           {console.log(user.data.isAdmin),
  //           setUserProfile(user.data)});
  //       })
  //       .catch((error) => console.log(error));
  // },[])

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
        name="Home"
        component={HomeNav}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <FontAwesome5 name="shopping-bag" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {context?.stateUser?.userProfile?.isAdmin === true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNav}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="user" color={color} size={30} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Activity"
        component={ActivityNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="list-alt" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
