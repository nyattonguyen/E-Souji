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
import CardNewOrder from "../../Shared/CartNewOrder";
import CardAcNew from "../../Shared/CardActivity";

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
  console.log("ccccc", orderNew);

  const cancleOrder = (id) => {
    clientAxios
      .delete(`orders/${id}`)
      .then((res) => {
        const order = orderNew.filter((item) => item._id !== id);
        setOrderNew(order);
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Hủy thành công",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Chờ duyệt");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Có lỗi xảy ra",
          text2: "Vui lòng thử lại",
        });
      });
  };

  return (
    <View style={styles.container}>
      <Box>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View>
            {orderNew ? (
              orderNew.map((x) => {
                return (
                  <View>
                    <CardAcNew key={x.id} {...x} />
                    <View style={styles.btn}>
                      <Button marginRight={10} onPress={() => cancleOrder()}>
                        Hủy
                      </Button>
                    </View>
                  </View>
                );
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
  btn: {
    display: "flex",
    height: 40,
    width: width,
    flex: 2,
    position: "relative",
    flexDirection: "row-reverse",
    borderRadius: 4,
  },
});
