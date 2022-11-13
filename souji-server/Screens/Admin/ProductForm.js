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
import axios from "axios";

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quanlityH, setQuanlityH] = useState();
  const [desc, setDescription] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setQuanlityH(props.route.params.item.quanlityH);
      setDescription(props.route.params.item.desc);
      setCategory(props.route.params.item.category._id);
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    //Category

    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => alert("Error to load categories"));
    return () => {
      setCategories([]);
    };
  }, []);

  const addProduct = () => {
    if (
      name == "" ||
      quanlityH == "" ||
      price == "" ||
      desc == "" ||
      category == ""
    ) {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();
    console.log("category", category);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quanlity", quanlityH);
    formData.append("desc", desc);
    formData.append("category", category);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)

        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Product successfuly updated",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
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
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product added",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
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
    <FormContainer title="Add Product">
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
        <Text style={{ textDecorationLine: "underline" }}>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        id="price"
        value={price}
        keyboardType={"numeric"}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Quanlity</Text>
      </View>
      <Input
        placeholder="Quanlity"
        name="quanlity"
        id="quanlityH"
        value={quanlityH}
        onChangeText={(text) => setQuanlityH(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="desc"
        id="desc"
        value={desc}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Category</Text>
      </View>
      <Box style={styles.boxfIP}>
        <Picker
          mode="dropdown"
          style={styles.picker}
          placeholder="Select your Category"
          selectedValue={pickerValue}
          onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        >
          {categories.map((c) => {
            return <Picker.Item key={c._id} label={c.name} value={c._id} />;
          })}
        </Picker>
      </Box>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <Button onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Button>
      </View>
    </FormContainer>
  );
};
export default ProductForm;

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
    width: undefined,
    shadowColor: Colors.deepGray,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
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
