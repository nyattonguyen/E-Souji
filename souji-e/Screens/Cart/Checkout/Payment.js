import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Container, Text, Box, Center, Radio, Image } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox, ListItem } from "react-native-elements";
// import {RadioButtonRN} from 'radio-buttons-react-native/RadioButtonRN';
import { RadioButton } from "react-native-paper";
import { Colors } from "../../../color";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import clientAxios from "../../../apis";

var { width } = Dimensions.get("window");

// this.Toast = React.createRef();
const methods = [
  // { name: "Momo", value: 1 },
  { name: "Tiền mặt", value: 2 },
];

const paymentCards = [
  { name: "MasterCard", value: 1 },
  { name: "Visa", value: 2 },
];

const Payment = (props) => {
  const order = props.route.params;
  // console.log("dayne", order);

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
  });

  const buyOrder = () => {
    clientAxios
      .post(`${baseURL}orders/pay`)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Công việc hoàn thành",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Thanh toán");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Có lỗi xảy ra",
          text2: "Vui lòng thử lại",
        });
      });
  };

  return (
    <Container>
      <View style={styles.container}>
        <Box>
          <Center style={styles.header}>
            <Text textAlign="center" fontSize={22}>
              Chọn phương thức thanh toán
            </Text>
          </Center>
        </Box>
        <TouchableOpacity
          style={{
            width: width - 20,
            marginLeft: 24,
            marginRight: 24,
            height: 80,
            backgroundColor: Colors.paypal,
            justifyContent: "center",
            alignItems: "center",
          }}
          // onPress={() => buyOrder()}
        >
          <Image
            source={require("../../../assets/image/paypal.png")}
            size="sm"
            width={200}
            height={50}
            position="absolute"
            marginLeft={24}
            marginRight={24}
          />
        </TouchableOpacity>
        <Box>
          {methods.map((item, index) => {
            return (
              <ListItem
                key={item.name}
                style={styles.page}
                onPress={() => setSelected(item.value)}
              >
                <View style={styles.itemMethod}>
                  <Text>{item.name}</Text>
                </View>
                <View>
                  <CheckBox
                    style={styles.checkbox}
                    checked={selected == item.value}
                  />
                </View>
              </ListItem>
            );
          })}
          {selected == 3 ? (
            <Picker
              style={styles.picker}
              mode="dropdown"
              dropdownIconColor={Colors.black}
              selectedValue={card}
              onValueChange={(x) => setCard(x)}
              accessibilityElementsHidden={Colors.main}
            >
              {paymentCards.map((c, index) => {
                return <Picker.Item label={c.name} value={c.name} />;
              })}
            </Picker>
          ) : null}
          <View>
            <Button
              title={"Tiếp theo"}
              onPress={() => props.navigation.navigate("Xác nhận", { order })}
            />
          </View>
        </Box>
      </View>
    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: "center",
  },
  page: {
    width: width - 20,
    alignItems: "center",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    shadowOpacity: 1,
    flexDirection: "row",
  },
  itemMethod: {
    justifyContent: "space-around",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    alignContent: "center",
    width: width,
  },
  checkbox: {
    zIndex: 1,
  },
  picker: {
    height: 30,
    backgroundColor: Colors.whitesmoke,
  },
});
