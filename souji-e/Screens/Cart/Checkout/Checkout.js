import { Center, Box } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ListItem } from "react-native-elements";
import Toast from "react-native-toast-message"
//form
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
//data
import { connect } from "react-redux";
import Colors from "../../../color";
const countries = require("../../../assets/countries.json");
//
import AuthGlobal from "../../../Context/store/AuthGlobal";


const Checkout = (props) => {

  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if(context.stateUser.isAdmin) {
      setUser(context.stateUser.user.sub)
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset:60,
        type:"error",
        text1:"Hãy đăng nhập trước khi thanh toán",
        text2:""
      });
    }

    return () => {
      setOrderItems();
    };
  });
  const checkOut = () => {
    console.log("orders", orderItems);
    let order = {
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      address,
      status: "4",
      user,
    };

    props.navigation.navigate("Payment", { order: order });
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Pending Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Address"}
          name={"address"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Box style={styles.boxfIP}>
          <Picker
            
            mode="dropdown"
            style={styles.picker}
            selectedValue={country}
            placeholder="Select yours country"
            dropdownIconColor={Colors.black}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Box>
        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title="Confirm" onPress={() => checkOut()} />
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
    boxfIP: {
        width: '80%',
        height: 60,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: 'orange',
        justifyContent:"center",
        fontSize:15,
    },
    picker: {
        width:undefined,
        shadowColor:Colors.deepGray,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:0
    },
    
    
})