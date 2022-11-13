import axios from "axios";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { Box } from "native-base";
import Toast from "react-native-toast-message";
// axios
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../Context/store/AuthGlobal";
// form custom
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import { Colors } from "../../color";
//
import countries from "../../assets/countries.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = (props) => {
  const context = useContext(AuthGlobal);

  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [street, setStreet] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateInfoUser = () => {
    if (!name || !phone || !street || !country) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "!!! Vui lòng nhập đầy đủ thông tin",
        text2: "",
      });
      return;
    }

    let infoUser = {
      //   id: context.stateUser.user.id,
      name: name,
      street: street,
      country: country,
      phone: phone,
    };
    console.log("aaaa", props.id);

    console.log("aaa", infoUser);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${baseURL}users/${context.stateUser.user.id}`, infoUser, config)

      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Cập nhật thành công",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("User Profile");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Có lỗi xảy ra",
          text2: "Vui lòng thử lại sau",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Nhập đầy đủ thông tin"}>
        <Input
          placeholder={"Họ tên"}
          name={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Input
          placeholder={"SDT"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Đường số - phường"}
          name={"street"}
          value={street}
          onChangeText={(text) => setStreet(text)}
        />
        <Box>
          <Picker
            mode="dropdown"
            style={styles.picker}
            selectedValue={country}
            placeholder="Chọn khu vực"
            dropdownIconColor={Colors.black}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Box>
        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title="Cập nhật" onPress={() => updateInfoUser()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  picker: {
    width: "90%",
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
  },
});
