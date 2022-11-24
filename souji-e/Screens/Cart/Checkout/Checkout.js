import { Center, Box, TextArea, Select } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ListItem } from "react-native-elements";
import Toast from "react-native-toast-message";
//form
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
//data
import { connect } from "react-redux";
import { Colors } from "../../../color";
const countries = require("../../../assets/countries.json");
const time = require("../../../assets/time.json");

//context
import AuthGlobal from "../../../Context/store/AuthGlobal";

const Checkout = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [hours, setHours] = useState();
  const [date, setDate] = useState();
  const [user, setUser] = useState();
  const [note, setNote] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.id);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Hãy đăng nhập trước khi thanh toán",
        text2: "",
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    // console.log("orders", orderItems);
    if (!hours || !date || !phone || !address || !country) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "!!! Vui lòng nhập đầy đủ thông tin",
        text2: "",
      });
      return;
    } else {
      let order = {
        // them ghi chu
        orderItems,
        phone,
        address: address,
        country,
        status: "4",
        note,
        user,
        hours,
        date: date,
        dateOrdered: Date.now(),
      };

      props.navigation.navigate("Thanh toán", { order: order });
    }
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Nhập đầy đủ thông tin"}>
        <Text style={styles.text}>Vui lòng đặt trước khoảng 30 phút</Text>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flex: 1,
            borderColor: Colors.sdGray,
          }}
        >
          <CalendarStrip
            calendarAnimation={{ type: "sequence", duration: 30 }}
            daySelectionAnimation={{
              type: "border",
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: Colors.blue,
            }}
            style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
            calendarHeaderStyle={{ color: "black" }}
            calendarColor={Colors.white}
            dateNumberStyle={{ color: "black" }}
            dateNameStyle={{ color: "black" }}
            highlightDateNumberStyle={{ color: Colors.blue }}
            highlightDateNameStyle={{ color: Colors.blue }}
            disabledDateNameStyle={{ color: "grey" }}
            iconContainer={{ flex: 0.1 }}
            disabledDateNumberStyle={{ color: "grey" }}
            selectedDate={date}
            onDateSelected={(e) => setDate(e)}
            scrollable={true}
          />
        </View>
        <Select
          mode="dropdown"
          style={styles.selecter}
          selectedValue={hours}
          width="84%"
          placeholder="Chọn giờ"
          dropdownIconColor={Colors.black}
          onValueChange={(e) => setHours(e)}
        >
          {time.map((c) => {
            return <Select.Item key={c.code} label={c.name} value={c.name} />;
          })}
        </Select>

        {/* <Input
          placeholder={"Chọn ngày"}
          name={"date"}
          value={date}
          onChangeText={(text) => setDate(text)}
        /> */}

        <TextArea
          style={styles.textarea}
          placeholder="Bạn có yêu cầu gì thêm, hãy ghi ở đây nhé"
          name={"note"}
          value={note}
          width={334}
          onChangeText={(text) => setNote(text)}
        ></TextArea>
        <Input
          placeholder={"SDT"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Địa chỉ"}
          name={"address"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Select
          style={styles.selecter}
          placeholder="Chọn khu vực"
          selectedValue={country}
          dropdownIcon={true}
          width="84%"
          dropdownIconColor={Colors.black}
          onValueChange={(e) => setCountry(e)}
        >
          {countries.map((c) => {
            return <Select.Item key={c.code} label={c.name} value={c.name} />;
          })}
        </Select>

        <View style={{ width: "80%", alignItems: "center", marginTop: 10 }}>
          <Button title="Xác nhận" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
export default connect(mapStateToProps)(Checkout);

const styles = StyleSheet.create({
  picker: {
    width: "80%",
    height: 60,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.bluemain,
    justifyContent: "center",
    fontSize: 15,
  },
  text: {
    color: "currentcolor",
    marginTop: 10,
    marginBottom: 10,
  },
  textarea: {
    height: 150,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.bluemain,
    justifyContent: "center",
    fontSize: 15,
  },
  selecter: {
    width: "80%",
    height: 60,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.bluemain,
    justifyContent: "center",
    fontSize: 13,
  },
});
