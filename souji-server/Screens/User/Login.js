import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "native-base";
import Error from "../../Shared/Error";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
//context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";
import { Colors } from "../../color";

const Login = (props) => {
  const context = useContext(AuthGlobal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { width } = Dimensions.get("window");

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

  return (
    <View style={{ width: width - 100 }}>
      <FormContainer title={"Đăng nhập"}>
        <Input
          placeholder={"example@gmail.com"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"****************"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <Button
            onPress={() => handleSubmit()}
            backgroundColor={Colors.bluemain}
            color={Colors.white}
            style={styles.btn}
          >
            <Text style={styles.text1}>Đăng nhập</Text>
          </Button>
        </View>
      </FormContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
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
    color: Colors.dodgerblue,
  },
});
export default Login;
