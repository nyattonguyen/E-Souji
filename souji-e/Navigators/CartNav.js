import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

//Screen
import Cart from '../Screens/Cart/Cart';
import CheckoutNav from './CheckoutNav';

import Colors from '../color';
import Main from './Main';
import ProductContainer from '../Screens/Products/ProductContainer';
import Login from '../Screens/User/Login';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Cart'
                component={Cart}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Checkout'
                component={CheckoutNav}
                options={{
                    headerShown: false,
                    title:'Checkout'
                }}
            />
            
            
        </Stack.Navigator>
    )
}

export default function CartNav() {
    return <MyStack />;
}