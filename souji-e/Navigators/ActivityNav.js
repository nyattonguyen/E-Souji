import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//Screen
import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../color";

import NewActivity from "../components/Activity/NewActivity";
import DoActivity from "../components/Activity/DoActivity";
import FnActivity from "../components/Activity/FnActivity";

const Stack = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get("window");

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chờ duyệt" component={NewActivity} />
      <Stack.Screen name="Đang làm" component={DoActivity} />
      <Stack.Screen name="Hoàn thành" component={FnActivity} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  text: {
    marginLeft: 8,
    marginTop: 14,
    fontSize: 18,
    fontWeight: 500,
  },
  container: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  containersub: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  btn: {
    backgroundColor: Colors.bluemain,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
});
export default function ActivityNav() {
  return <MyStack />;
}
