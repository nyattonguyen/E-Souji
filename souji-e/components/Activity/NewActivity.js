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
import { View, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../color";
import CardActivity from "../../Shared/CardActivity";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// axios
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../Context/store/AuthGlobal";
import clientAxios from "../../apis";

const { width } = Dimensions.get("window");

const NewActivity = (props) => {
  const context = useContext(AuthGlobal);

  const [orderNew, setOrderNew] = useState();

  useFocusEffect(
    useCallback(() => {
      // new order
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        clientAxios
          .get(`/orders/userordernew/${context.stateUser.user.id}`)
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
    <View style={styles.container}>
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
                    alt="isempty"
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
  container: {
    flex: 1,
    width: width,
  },
  button: {
    backgroundColor: Colors.black,
    color: Colors.white,
    borderRadius: 8,
    marginTop: 30,
  },
});
