import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screen

import ActivityContainer from "../Screens/Activity/ActivityContainer";
import Tabs from "../components/Activity/Tabs";
import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../color";
import AuthGlobal from "../Context/store/AuthGlobal";
import { Text } from "native-base";

const Stack = createStackNavigator();
const { width, height } = Dimensions.get("window");

function MyStack() {
  const context = useContext(AuthGlobal);
  console.log("abcc", context);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          backgroundColor: Colors.bluemain,
          height: height,
        }}
      >
        <Tabs />
      </View>
    </View>
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="ActivityCon"
    //     component={ActivityContainer}
    //     options={{
    //       headerShown: false,
    //     }}
    //   />
    // </Stack.Navigator>
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
