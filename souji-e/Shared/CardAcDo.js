import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Button, HStack, Pressable } from "native-base";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import baseURL from "../assets/common/baseUrl";
import { Colors } from "../color";
import TrafficLight from "./StyleComponents/TrafficLight";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const CardAcDo = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
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

  const updateFinishedOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      country: props.country,
      address: props.address,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      hours: props.hours,
      date: props.date,
      dateOrdered: props.dateOrdered,
    };

    axios
      .put(`${baseURL}orders/get/checkorder/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Công việc hoàn thành",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("FnActivity");
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
      <Pressable>
        <View style={styles.container}>
          <View style={styles.item} flex="1">
            <Text fontSize={13} color={Colors.black} isTruncated>
              {props.id}
            </Text>
            <Text fontSize={13} color={Colors.steelblue}>
              {statusText}
            </Text>
          </View>
          <View style={styles.item} flex="1">
            <Text
              px={7}
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
            <Button style={styles.btn} onPress={() => updateFinishedOrder()}>
              <Text style={{ color: "white" }}>Hoàn thành</Text>
            </Button>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default CardAcDo;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.subGreen,
    shadowColor: Colors.sdGray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    borderColor: Colors.deepGray,
    borderWidth: 1,
  },
  subContainer: {
    margin: 10,
  },
  item: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  btn: {
    width: 90,
    height: 36,
    padding: 3,
    margin: 10,
    alignItems: "center",
  },
});
