import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

//Screen


import Colors from '../color';

import ActivityContainer from '../Screens/Activity/ActivityContainer';




const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ActivityCon'
                component={ActivityContainer}
                options={{
                    headerShown: false,
                }}                
            />
            
        </Stack.Navigator>
    )
}

export default function CartNav() {
    return <MyStack />;
}