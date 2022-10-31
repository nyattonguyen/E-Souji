import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import { useEffect } from "react/cjs/react.development";
import OrderCard from "../../Shared/OrderCard";
import OrderBooking from "../../Shared/OrderBooking";

import Colors from "../../color";

const { width } = Dimensions.get("window");

const UserProfile = (props) => {

  const context = useContext(AuthGlobal);
  
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.id}`, {
              headers: { Authorization: `Bearer ${res}`}
            })
            .then((user) => 
            
            setUserProfile(user.data));
        })
        .catch((error) => console.log(error));

      // my order
      AsyncStorage.getItem("jwt").then((res) => {

        if(!context?.stateUser?.user?.id) return;

        axios
          .get(`${baseURL}orders/get/userorders/${context.stateUser.user.id}`)
          .then((x) => {
            const data = x.data;
            setOrders(data);
          });
      });

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.subContainer}>
        <View style={styles.info}>
          <Text style={{ fontSize: 30 }}>
            {userProfile ? userProfile.name : ""}
          </Text>
          <View style={{ marginTop: 30 }}>
            <Text style={{ marginTop: 10 }}>
              Email: {userProfile ? userProfile.email : ""}
            </Text>
            <Text style={{ marginTop: 10 }}>
              Phone: {userProfile ? userProfile.phone : ""}
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <Button
              title="Đăng xuất"
              onPress={() => [
                AsyncStorage.removeItem("jwt"),
                logoutUser(context.dispatch),
              ]}
            />
          </View>
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>List booking</Text>
          <View>
            {orders ? (
              orders.map((x) => {
                return <OrderBooking key={x.id} {...x} />;
              })
            ) : (
              <View>
                <Text style={{ fontSize: 20, fontWeight: "400" }}>
                  Không có công việc nào đang làm
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    marginTop: 20,
  },
  info: {
    display: "flex",
    alignItems: "center",
    width: width - 60,
    marginLeft: 30,
    height: 250,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderTopColor:Colors.black,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default UserProfile;
