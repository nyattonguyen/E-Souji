import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
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
import React, { useContext, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import baseURL from "../../assets/common/baseUrl";
import Colors from "../../color";
import AuthGlobal from "../../Context/store/AuthGlobal";
import CardAcDeli from "../../Shared/CardAcDeli";
import CardAcDo from "../../Shared/CardAcDo";

const DoActivity = (props) => {
  const context = useContext(AuthGlobal);
  const [orderDeli, setOrderDeli] = useState();
  const [orderDoi, setOrderDoi] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      // activity doing
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        axios
          .get(`${baseURL}orders/userorderdoi/${context.stateUser.user.id}`)
          .then((x) => {
            const data = x.data.doactivity;
            console.log("Cai log 1", data);
            setOrderDoi(data);
          });
      });

      // dang den
      AsyncStorage.getItem("jwt").then((res) => {
        axios
          .get(`${baseURL}orders/userorderdeli/${context.stateUser.user.id}`)
          .then((x) => {
            const data2 = x.data.deliativity;
            console.log("Cai log 2 ", data2);
            setOrderDeli(data2);
          });
      });

      // return () => {
      //     setOrderDeli();
      // };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View>
      <Box h={200}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View>
            {orderDoi
              ? orderDoi.map((x) => <CardAcDo key={x.id} {...x} />)
              : null}
          </View>

          <View>
            {orderDeli && orderDeli?.length
              ? orderDeli.map((x) => <CardAcDeli key={x._id} {...x} />)
              : null}
          </View>
        </ScrollView>
      </Box>
    </View>
  );
};
export default DoActivity;
const styles = StyleSheet.create({
  bb: {
    width: "full",
    borderBottomColor: Colors.black,
    textAlign: "center",
    marginTop: 3,
    borderBottomWidth: 1,
  },
});
