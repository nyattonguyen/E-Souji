import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, View, Dimensions } from "react-native";
import { LogBox } from "react-native";
// import Toast from "react-native-toast-message";
import Header from "./Shared/Header";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navigators
import Main from "./Navigators/Main";
//Context Api
import Auth from "./Context/store/Auth";
import Test from "./Screens/Activity/Test";

LogBox.ignoreAllLogs(true);

const { width } = Dimensions.get("window");

export const App = () => {
  return (
    // <NativeBaseProvider>
    //   <View style={styles.container}>
    //     <Test />
    //   </View>
    // </NativeBaseProvider>
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider style={styles.container}>
          <NavigationContainer>
            <Header />
            <Main />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignContent: "center",
    justifyContent: "center",
  },
});
