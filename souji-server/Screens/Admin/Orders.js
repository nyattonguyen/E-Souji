import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../Shared/OrderCard";
import { Button, Input, ScrollView } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../color";

const { height } = Dimensions.get("window");

const Orders = (props) => {
  const [orderList, setOrderList] = useState();
  const [orderFilter, setOrderFilter] = useState();

  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
        setOrderFilter();
        setLoading(true);
      };
    }, [])
  );
  AsyncStorage.getItem("jwt")
    .then((res) => {
      setToken(res);
    })
    .catch((error) => console.log(error));

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrders = () => {
    axios
      .get(`${baseURL}orders`)
      .then((x) => {
        setOrderList(x.data);
        setOrderFilter(x.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const searchOrder = (text) => {
    if (text == "") {
      setOrderList(orderList);
    }
    setOrderFilter(
      orderList.filter((i) =>
        i.user.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Orders")}
        >
          <Icon
            style={styles.icon1}
            name="shopping-bag"
            size={18}
            color="white"
          />
          <Text style={styles.buttonText}>Orders</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <Icon style={styles.icon2} name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Products</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Categories")}
        >
          <Icon style={styles.icon3} name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("UserForm")}
        >
          <Icon style={styles.icon4} name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </Button>
      </View>
      <View>
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Orders
            </Text>
          </View>
          <View style={{ padding: 5 }}>
            <Input
              style={{
                borderColor: Colors.black,
                backgroundColor: Colors.white,
              }}
              placeholder="Search by user name"
              onChangeText={(text) => searchOrder(text)}
            ></Input>
          </View>
        </View>

        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <View>
            <FlatList
              data={orderFilter}
              renderItem={({ item }) => (
                <OrderCard navigation={props.navigation} {...item} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default Orders;

const styles = StyleSheet.create({
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
  btn: {
    marginRight: 3,
  },
  icon1: {
    marginLeft: 16,
  },
  icon2: {
    marginLeft: 22,
  },
  icon3: {
    marginLeft: 28,
  },
  icon3: {
    marginLeft: 13,
  },
});
