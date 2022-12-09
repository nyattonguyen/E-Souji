import { ScrollView, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";

import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import clientAxios from "../../apis";
import CardAcDeli from "../../Shared/CardAcDeli";
import CardAcDo from "../../Shared/CardAcDo";

const DoActivity = (props) => {
  const context = useContext(AuthGlobal);
  const [orderDeli, setOrderDeli] = useState([]);
  const [orderDoi, setOrderDoi] = useState();
  useFocusEffect(
    useCallback(() => {
      // activity doing
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        clientAxios
          .get(`/orders/userorderdoi/${context.stateUser.user.id}`)
          .then((x) => {
            const data = x.data.doactivity;
            setOrderDoi(data);
          });

        clientAxios
          .get(`/orders/userorderdeli/${context.stateUser.user.id}`)
          .then((x) => {
            const data2 = x.data.deliativity;
            setOrderDeli(data2);
          });
      });
      // dang den

      return () => {
        setOrderDeli();
        setOrderDoi();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.item}>
          {orderDoi
            ? orderDoi.map((item) => {
                return <CardAcDo key={item.id} {...item} />;
              })
            : null}
        </View>
        <View style={styles.item}>
          {orderDeli
            ? orderDeli.map((item) => {
                return <CardAcDeli key={item.id} {...item} />;
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};
export default DoActivity;
const styles = StyleSheet.create({
  item: {
    marginBottom: 4,
  },
});
