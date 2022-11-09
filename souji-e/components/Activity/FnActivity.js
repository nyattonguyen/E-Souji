import {
    ScrollView,
} from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../color";


import AuthGlobal from "../../Context/store/AuthGlobal";
import CardActivity from "../../Shared/CardActivity";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

const FnActivity = (props) => {
  const context = useContext(AuthGlobal);
  const [orderFn, setOrderFn] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("User");
      }

      // new order
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
    <View>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.item}>
          {orderFn
            ? orderFn.map((item) => {
                return <CardActivity key={item.id} {...item} />;
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};
export default FnActivity;

const styles = StyleSheet.create({
  item: {
    marginBottom: 4,
  },
});
