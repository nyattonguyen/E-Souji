import React, { useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Container, Button } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import { useEffect } from "react/cjs/react.development";

import { Colors } from "../../color";
import History from "../../Shared/History";
import clientAxios from "../../apis";

const { width } = Dimensions.get("window");

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);

  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  const [orderFn, setOrderFn] = useState();

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
          clientAxios
            .get(`/users/${context.stateUser.user.id}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data));
        })
        .catch((error) => console.log(error));

      // my order
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        clientAxios
          .get(`/orders/get/userorders/${context.stateUser.user.id}`)
          .then((x) => {
            const data = x.data;
            setOrders(data);
          });
      });

      // history
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        clientAxios
          .get(`/orders/userorderfinished/${context.stateUser.user.id}`)
          .then((x) => {
            const data = x.data.finished;
            setOrderFn(data);
          });
      });

      return () => {
        setUserProfile();
        setOrders();
        setOrderFn();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.subContainer}>
        <View style={styles.containerSD}>
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
                style={styles.btn}
                onPress={() => props.navigation.navigate("Edit Profile")}
              >
                Chỉnh sửa hồ sơ cá nhân
              </Button>
            </View>
            <View style={{ marginTop: 30 }}>
              <Button
                style={styles.btn}
                onPress={() => [
                  AsyncStorage.removeItem("jwt"),
                  logoutUser(context.dispatch),
                ]}
              >
                Đăng xuất
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    elevation: 20,
    shadowColor: "#52006A",
  },
  subContainer: {
    marginTop: 20,
  },
  btn: {
    backgroundColor: Colors.bluemain,
    fontWeight: "600",
    elevation: 20,
    shadowColor: "#52006A",
  },
  containerSD: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  history: {
    margin: 10,
    width: width - 20,
    backgroundColor: Colors.black,
  },
  btnHis: {
    backgroundColor: Colors.black,
  },
  info: {
    display: "flex",
    alignItems: "center",
    width: width - 60,
    height: 340,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 15,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default UserProfile;
