import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navigators
import Main from "./Navigators/Main";
//Context Api
import Auth from "./Context/store/Auth";

const App = () => {
  return (
    // <NativeBaseProvider>
    //   <Test />

    // </NativeBaseProvider>
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider style={styles.container}>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
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
    alignContent: "center",
    justifyContent: "center",
  },
});
