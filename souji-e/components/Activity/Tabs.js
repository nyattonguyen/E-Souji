import { Text } from 'native-base'
import React, { useState } from 'react'
import { useWindowDimensions, StyleSheet } from 'react-native'
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import DoActivity from "./DoActivity";
import NewActivity from "./NewActivity";
import FnActivity from "./FnActivity";
import Colors from "../../color";


const renderScene = SceneMap({
    first:NewActivity,
    second:DoActivity,
    third: FnActivity,
})

export default function Tabs() {
    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {
            key:"first", title:"Đang chờ"
        },
        {
            key:"second", title:"Đang làm"
        },
        {
            key:"third", title:"Hoàn thành"
        }
    ]);
    const renderTabsBar = (props) =>(
        <TabBar {...props} tabStyle={styles.tabStyle} 
        indicatorSt 
        activeColor={Colors.main}
        inactiveColor={Colors.white}
        renderLabel={({route, color}) => ( 
            <Text style={{color, ...styles.text}}>
                {route.title}
            </Text>
        )} />
    );

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width:layout.width}}
            renderTabBar={renderTabsBar} />
    )
}

const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor: "black",
    },
    text:{
        fontSize: 14,
        fontWeight:"bold"
    },
})