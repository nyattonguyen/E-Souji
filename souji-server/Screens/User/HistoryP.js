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

import History from "../../Shared/History";

import { Colors } from "../../color";

const { width } = Dimensions.get("window");

const HistoryP = (props) => {
  const context = useContext(AuthGlobal);

  const [orderFn, setOrderFn] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      // history
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        axios
          .get(
            `${baseURL}orders/userorderfinished/${context.stateUser.user.id}`
          )
          .then((x) => {
            const data = x.data.finished;
            setOrderFn(data);
          });
      });

      return () => {
        setOrderFn();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.subContainer}>
        <View style={styles.order}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            Lịch sử Booking
          </Text>
          <View>
            {orderFn ? (
              orderFn.map((x) => {
                return <History key={x.id} {...x} />;
              })
            ) : (
              <View>
                <Text style={{ fontSize: 20, fontWeight: "400" }}>
                  Bạn chưa có đặt lịch bên Souji.
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
    height: 250,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderTopColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  order: {
    alignItems: "center",
    marginBottom: 60,
  },
});

export default HistoryP;
