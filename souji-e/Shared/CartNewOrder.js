import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Button, HStack, Pressable, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import clientAxios from "../apis";
import { Colors } from "../color";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TrafficLight from "./StyleComponents/TrafficLight";
import axios from "axios";

const { width } = Dimensions.get("window");

const CardNewOrder = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    // if (props.editMode) {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    // }

    if (props.status == "4") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("Dang cho duyet");
      setCardColor("#E74C3C");
    } else if (props.status == "3") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("Dang den ....");
      setCardColor("#F1C40F");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("Dang lam viec");
      setCardColor("#F34019");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("Hoan thanh");
      setCardColor("#fff");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const cancleOrder = () => {
    clientAxios
      .delete(`/${props.id}`)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Công việc hoàn thành",
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
    <View style={styles.subContainer}>
      <Pressable backgroundColor={Colors.subGreen}>
        <View style={styles.container}>
          <View style={styles.item} flex="1">
            <Text fontSize={13} color={Colors.black} isTruncated>
              {props.id}
            </Text>
            <Text fontSize={13} color={Colors.steelblue}>
              {statusText}
            </Text>
          </View>
          <View style={styles.item} flex={1}>
            <Text
              px={4}
              py={1.5}
              rounded={50}
              bg={Colors.bluemain}
              _text={{
                color: Colors.white,
              }}
              _pressed={{
                bg: Colors.blue,
              }}
            >
              {props.totalPrice}VND
            </Text>
            <Text fontSize={13} color={Colors.black}>
              {props.hours} | {props.date}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default CardNewOrder;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: width,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.subGreen,
    borderWidth: 0.5,
    shadowColor: Colors.sdGray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    borderColor: Colors.deepGray,
  },
  subContainer: {
    margin: 10,
  },
  item: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    flexDirection: "column",
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
