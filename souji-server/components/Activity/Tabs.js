import { Text } from "native-base";
import React, { useState } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import DoActivity from "./DoActivity";
import NewActivity from "./NewActivity";
import FnActivity from "./FnActivity";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chờ duyệt" component={NewActivity} />
      <Tab.Screen name="Đang làm" component={DoActivity} />
      <Tab.Screen name="Hoàn thành" component={FnActivity} />
    </Tab.Navigator>
  );
}
export default Tabs;
const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: "black",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
