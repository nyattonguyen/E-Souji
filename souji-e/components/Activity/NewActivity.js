import {
  Center,
  Image,
  Box,
  Spacer,
  Text,
  Button,
  ScrollView,
  FlatList,
  Pressable,
  HStack,
} from "native-base";
import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../color";
import CardActivity from "../../Shared/CardActivity";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// axios
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../Context/store/AuthGlobal";

const NewActivity = (props) => {
  const context = useContext(AuthGlobal);

  const [orderNew, setOrderNew] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("User");
      }

      // new order
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        axios
          .get(`${baseURL}orders/userordernew/${context.stateUser.user.id}`)
          .then((x) => {
            const data = x.data.newativity;
            setOrderNew(data);
          });
      });

      return () => {
        setOrderNew();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View>
      <Box>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View>
            {orderNew ? (
              orderNew.map((x) => {
                return <CardActivity key={x.id} {...x} />;
              })
            ) : (
              <Box flex={1}>
                <Center alignContent="center" alignItems="center" h="full">
                  <Image
                    source={require("../../assets/image/orderempty.png")}
                    w={100}
                    h={100}
                  />
                  <Center>Công việc đang trống</Center>
                  <Spacer />
                  <Button shadow={1} style={styles.button}>
                    Đăng việc ngay
                  </Button>
                </Center>
              </Box>
            )}
          </View>
        </ScrollView>
      </Box>
    </View>
  );
};
export default NewActivity;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.black,
    color: Colors.white,
    borderRadius: 8,
    marginTop: 30,
  },
});
