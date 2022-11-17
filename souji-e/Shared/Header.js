import { Heading, Image } from "native-base";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../color";

var { width } = Dimensions.get("window");

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerLogo}>
        <Image
          source={require("../assets/image/logo.png")}
          size="xl"
          style={{ height: 60 }}
          alt="logo"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: Colors.bluemain,
  },
  headerLogo: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: Colors.white,
    display: "flex",
    alignItems: "center",
  },
});

export default Header;
