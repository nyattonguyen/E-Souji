import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Box, Button, Select } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { Colors } from "../../color";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import countries from "../../assets/countries.json";
import axios from "axios";

const User = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [street, setStreet] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setName(props.route.params.item.name);
      setPhone(props.route.params.item.phone);
      setStreet(props.route.params.item.street);
      setCountry(props.route.params.item.country);
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    //Category
  }, []);

  const updateUser = () => {
    if (name == "" || country == "" || phone == "" || street == "") {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("street", street);
    formData.append("country", country);
    formData.append("phone", phone);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}users/${item.id}`, formData, config)

        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "User successfuly updated",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("UserForm");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };

  return (
    <FormContainer title="Update User">
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Phone</Text>
      </View>
      <Input
        placeholder="Phone"
        name="phone"
        id="phone"
        keyboardType={"numeric"}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Street</Text>
      </View>
      <Input
        placeholder="Street"
        name="street"
        id="street"
        value={street}
        onChangeText={(text) => setStreet(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Country</Text>
      </View>

      <Select
        mode="dropdown"
        style={styles.picker}
        placeholder="Select your Country"
        selectedValue={pickerValue}
        onValueChange={(e) => [setPickerValue(e), setCountry(e)]}
      >
        {countries.map((c) => {
          return <Select.Item key={c.code} label={c.name} value={c.name} />;
        })}
      </Select>

      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <Button onPress={() => updateUser()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Button>
      </View>
    </FormContainer>
  );
};
export default User;

const styles = StyleSheet.create({
  boxfIP: {
    width: "80%",
    height: 60,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: "orange",
    justifyContent: "center",
    fontSize: 15,
  },
  picker: {
    flex: 1,
    width: "70%",
    shadowColor: Colors.deepGray,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.bluemain,
  },
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
