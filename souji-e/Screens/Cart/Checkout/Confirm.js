import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { Text } from "native-base";
import { ListItem } from "react-native-elements";
import { Colors } from "../../../color";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartAction";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import clientAxios from "../../../apis";

const { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const finalOrder = props.route.params;

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    clientAxios
      .post("/orders", order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Đăng bài thành công",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Hoạt động");
          }, 500);
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Xảy ra lỗi",
          text2: "Hãy thử lại sau ",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={StyleSheet.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.text, { marginBottom: 5 }]}>
          Xác nhận thông tin
        </Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1 }}>
            <Text style={styles.title}></Text>
            <View style={{ padding: 8 }}>
              <Text>
                Book ngày:
                {moment(finalOrder.order.order.date).format("DD-MM-YYYY")}{" "}
              </Text>
              <Text>Book giờ: {finalOrder.order.order.hours}</Text>
              <Text>Địa chỉ: {finalOrder.order.order.address}</Text>
              <Text>{finalOrder.order.order.country}</Text>
              <Text>Ghi chú: {finalOrder.order.order.note}</Text>
            </View>
            <Text style={styles.title}>Gói dịch vụ:</Text>
            {finalOrder.order.order.orderItems.map((x) => {
              return (
                <ListItem style={styles.listItem} key={x.product.name}>
                  <View>
                    <Text>{x.product.name}</Text>
                  </View>
                  <View>
                    <Text>{x.product.price}VND</Text>
                  </View>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button
            title="Đăng bài"
            onPress={
              confirmOrder
              // , ()=> {() => props.navigation.navigate('Hoạt động')}
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispathToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(null, mapDispathToProps)(Confirm);

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.main,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shipping: {},
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
