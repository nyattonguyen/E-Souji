import { Box, Center, Image, Text, Button } from "native-base";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../color";
import Tabs from "../../components/Activity/Tabs";
import AuthGlobal from "../../Context/store/AuthGlobal";

const ActivityContainer = (props) => {
  const context = useContext(AuthGlobal);
  console.log(context);
  return (
    <View style={styles.container}>
      {context.stateUser.isAuthenticated ? (
        <View>
          <Tabs />
        </View>
      ) : (
        <View style={styles.containersub}>
          <Text
            marginBottom={20}
            fontSize={16}
            color={Colors.black}
            fontWeight="500"
          >
            Đăng nhập để xem tình trạng Booking
          </Text>
          <Button
            style={styles.btn}
            onPress={() => props.navigation.navigate("User")}
          >
            Đăng nhập
          </Button>
        </View>
      )}
    </View>
  );
};

export default ActivityContainer;

const styles = StyleSheet.create({
  text: {
    marginLeft: 8,
    marginTop: 14,
    fontSize: 18,
    fontWeight: 500,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "block",
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
