import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyleComponents/TrafficLight";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import { Colors } from "../color";

const codes = [
  { name: "Chon tinh trang cv", code: "0" },
  { name: "Dang cho duyet", code: "4" },
  { name: "Dang den ....", code: "3" },
  { name: "Dang lam viec", code: "2" },
  { name: "Hoan thanh", code: "1" },
];

const OrderCard = (props) => {
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
      setCardColor("#FFA43D");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("Dang lam viec");
      setCardColor("#E3D936");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("Hoan thanh");
      setCardColor("#87C7C7");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
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
      note: props.note,
      user: props.user,
      hours: props.hours,
      date: props.date,
      dateOrdered: props.dateOrdered,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Edited",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.containerHeader}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "500" }}>
          Tình trạng: {statusText} {orderStatus}
        </Text>
        <Text>
          Giờ và ngày booking: {props.hours} && {props.date}
        </Text>
        <Text>Địa chỉ: {props.address}</Text>
        <Text>Quận: {props.country}</Text>
        <Text>Ghi chú: {props.note}</Text>
        <Text style={{ fontWeight: "500" }}>Người book: {props.user.name}</Text>
        <Text>Ngày tạo: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Đơn giá: </Text>
          <Text style={styles.price}>{props.totalPrice}VND</Text>
        </View>
        {/* {props.editMode ? ( */}
        <View>
          <Picker
            mode="dropdown"
            style={styles.picker}
            selectedValue={statusChange}
            placeholder="Change Status"
            dropdownIconColor={Colors.black}
            onValueChange={(e) => setStatusChange(e)}
          >
            {codes.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.code} />;
            })}
          </Picker>
          <Button style={styles.btn} onPress={() => updateOrder()}>
            <Text style={{ color: "white" }}>Update</Text>
          </Button>
        </View>
        {/* ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  containerHeader: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: Colors.subGreen,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
  btn: {
    width: 90,
    height: 36,
    padding: 3,
    margin: 10,
    alignItems: "center",
  },
  picker: {
    width: 112,
    shadowColor: Colors.deepGray,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    padding: 3,
    borderRadius: 6,
  },
});

export default OrderCard;
