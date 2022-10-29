import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
// Screen
import Products from "../Screens/Admin/Products";
import Categories from "../Screens/Admin/Categories";
import ProductForm from "../Screens/Admin/ProductForm";
import Orders from "../Screens/Admin/Orders";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={Products}                
                options={{
                    headerShown: false,
                    title:"Products"
                    
                }}
            />
             <Stack.Screen 
                name="Categories"
                component={Categories}
                options={{
                    headerShown: false,
                    title:"Category"

                }}
            />
             <Stack.Screen 
                name="ProductForm"
                component={ProductForm}
                options={{
                    headerShown: false
                }}
            />

                <Stack.Screen 
                name="Orders"
                component={Orders}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function AdminNav() {
    return <MyStack />
}