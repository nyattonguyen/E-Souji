import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import Error from "../../Shared/Error";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
//context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";
import { Colors } from "../../color";
import clientAxios from "../../apis";
import Toast from "react-native-toast-message";

const Reset = (props) => {
  const context = useContext(AuthGlobal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Bạn hãy điền email và password");
    } else {
      loginUser(user, context.dispatch);
    }
  };
  const forgot = () => {
    const user = {
      email,
    };

    if (email === "") {
      setError("Bạn hãy điền email và password");
    }
    clientAxios
      .put(`/forgot`, user)
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
    <FormContainer title={"Quên mật khẩu"}>
      <Text style={{ margin: 10, fontSize: 16 }}>Hãy nhập email của bạn</Text>
      <Input
        placeholder={"example@gmail.com"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />

      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
      </View>
      <View>
        <Button
          onPress={() => forgot()}
          backgroundColor={Colors.bluemain}
          color={Colors.white}
          style={styles.btn}
        >
          <Text style={styles.text1}>Xác nhận</Text>
        </Button>
      </View>
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  btn: {
    backgroundColor: Colors.bluemain,
    color: Colors.white,
    shadowColor: "#000",
    hadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  text1: {
    fontSize: 16,
    fontWeight: "500",
  },
  text2: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.steelblue,
  },
});
export default Reset;
