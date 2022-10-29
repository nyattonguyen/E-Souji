import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../../color";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";


const Register = (props) => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Vui lòng điền đầy đủ thông tin")
    }
    
    let user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        isAdmin: false,
      };

    axios
    .post(`${baseURL}users/register`, user)
    .then((res) => {
        if (res.status == 200) {
            Toast.show({
                topOffset: 60,
                type:"sucess",
                text1: "Đăng kí thành công",
                text2: "Hãy đăng nhập với tài khoản của bạn",
              });
            setTimeout(() => {
                props.navigation.navigate("Login")
            }, 500);
        }
    })
    .catch((error) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Đăng kí thất bại",
            text2: "Hãy thử lại",
          });
    });  
}

    return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <Button bg={Colors.main} onPress={() => register()}>
            <Text style={styles.text1}>Đăng kí</Text>
          </Button>
        </View>
        <View style={styles.btn}>
          <Button background="none"
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles.text2}>Trở lại Đăng nhập</Text>
          </Button>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      margin: 10,
      alignItems: "center",
    },
    btn:{
        marginTop:10,        
    },
    text1: {
      fontSize: 16,
      fontWeight:"500",
      color:Colors.white
    },
    text2:{
      fontSize:16,
      fontWeight:"400",
      color: Colors.dodgerblue

    }
  });
export default Register 