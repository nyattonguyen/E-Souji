import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { HStack, Pressable, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../color";
import TrafficLight from "./StyleComponents/TrafficLight";

const { width } = Dimensions.get("window");

const CardAcDeli = (props) => {
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
  }, [props.status]);

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
              {props.hours} | {moment(props.date).format("DD-MM-YYYY")}{" "}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default CardAcDeli;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width - 10,
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
});
