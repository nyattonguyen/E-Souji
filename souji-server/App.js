import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, View } from "native-base";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import Header from "./Shared/Header";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navigators
import Main from "./Navigators/Main";
//Context Api
import Auth from "./Context/store/Auth";
import Banner from "./Shared/Banner";

export const App = () => {
  const [size, setSize] = useState();
  return (
    // <NativeBaseProvider>
    //   <Banner />
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
