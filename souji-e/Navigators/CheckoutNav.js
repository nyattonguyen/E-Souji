import React, { useState} from 'react'
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useWindowDimensions, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from 'native-base'
//Screens
import Checkout from '../Screens/Cart/Checkout/Checkout'
import Confirm from '../Screens/Cart/Checkout/Confirm'
import Payment from '../Screens/Cart/Checkout/Payment'
import Colors from '../color';



const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Shipping" component={Checkout} />
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="Confirm" component={Confirm} />
        </Tab.Navigator>
    );
}

export default function CheckoutNavigator() {
    return <MyTabs />
}

