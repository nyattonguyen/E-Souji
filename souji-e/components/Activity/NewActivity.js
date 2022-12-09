import {
  Center,
  Image,
  Box,
  Spacer,
  Text,
  Button,
  ScrollView,
  FlatList,
  Pressable,
  HStack,
} from "native-base";
import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../color";
import CardActivity from "../../Shared/CardActivity";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// axios
import AuthGlobal from "../../Context/store/AuthGlobal";
import clientAxios from "../../apis";
import CardNewOrder from "../../Shared/CardNewOrder";
import { Toast } from "react-native-toast-message";
import TrafficLight from "../../Shared/StyleComponents/TrafficLight";
const { width } = Dimensions.get("window");

const NewActivity = (props) => {
  const context = useContext(AuthGlobal);
  const [statusChange, setStatusChange] = useState();
  const [statusText, setStatusText] = useState();
  const [orderNew, setOrderNew] = useState();
  const [cardColor, setCardColor] = useState();
  const [orderStatus, setOrderStatus] = useState();

  useFocusEffect(
    useCallback(() => {
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
      } else if (props.status == "5") {
        setOrderStatus(<TrafficLight limited></TrafficLight>);
        setStatusText("Da huy");
        setCardColor("#F34019");
      } else {
        setOrderStatus(<TrafficLight available></TrafficLight>);
        setStatusText("Hoan thanh");
        setCardColor("#fff");
      }
      // new order
      AsyncStorage.getItem("jwt").then((res) => {
        if (!context?.stateUser?.user?.id) return;

        clientAxios
          .get(`/orders/userordernew/${context.stateUser.user.id}`)
          .then((x) => {
            const data = x.data.newativity;
            setOrderNew(data);
          });
      });

      return () => {
        setOrderNew();
        setOrderStatus();
        setStatusText();
        setCardColor();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <View style={styles.container}>
      <Box>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={{ flex: 1 }}>
            {orderNew ? (
              orderNew.map((x) => {
                return (
                  <View>
                    <CardNewOrder key={x.id} {...x} />
                  </View>
                );
              })
            ) : (
              <View>
                <Center
                  display="flex"
                  alignContent="center"
                  alignItems="center"
                >
                  <Image
                    source={require("../../assets/image/orderempty.png")}
                    w={100}
                    h={100}
                    alt="isempty"
                  />
                  <Center>Công việc đang trống</Center>
                  <Spacer />
                  <Button
                    shadow={1}
                    style={styles.button}
                    onPress={() => props.navigation.navigate("Home")}
                  >
                    Đăng việc ngay
                  </Button>
                </Center>
              </View>
            )}
          </View>
        </ScrollView>
      </Box>
    </View>
  );
};
export default NewActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  button: {
    backgroundColor: Colors.black,
    color: Colors.white,
    borderRadius: 8,
    marginTop: 30,
  },
  btn: {
    display: "flex",
    height: 40,
    width: width,
    flex: 2,
    position: "relative",
    flexDirection: "row-reverse",
    borderRadius: 4,
  },
});
