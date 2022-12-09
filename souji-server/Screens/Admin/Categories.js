import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "native-base";
import Toast from "react-native-toast-message";
import { Colors } from "../../color";

var { width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text style={{ marginLeft: 10 }}>{props.item.name}</Text>

      {props.item.status === "disable" ? (
        <TouchableOpacity
          style={[styles.btn, styles.disable]}
          onPress={() => props.disable(props.item._id)}
        >
          <Text style={{ color: "white", fontWeight: "bold", marginTop: 5 }}>
            Disable
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.btn, styles.enable]}
          onPress={() => props.enable(props.item._id)}
        >
          <Text style={{ color: "white", fontWeight: "bold", marginTop: 5 }}>
            Enable
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then((res) => setCategories([...categories, res.data]))
      .catch((error) => alert("Error to load categories"));

    setCategoryName("");
  };
  const disableCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${baseURL}categories/disable/${id}`, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Disable category successfuly ",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Categories");
          }, 500);
        }
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error to load categories"));
  };
  const enableCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${baseURL}categories/enable/${id}`, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Enable category successfuly ",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Categories");
          }, 500);
        }
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error to load categories"));
  };
  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Delete categories successfuly ",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Categories");
          }, 500);
        }
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error to load categories"));
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              index={index}
              disable={disableCategory}
              enable={enableCategory}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "500" }}>
            Add Category
          </Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <Button style={styles.btn} onPress={() => addCategory()}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 5,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 6,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  btn: {
    width: 90,
    height: 36,
    padding: 3,
    margin: 10,
    alignItems: "center",
  },
  disable: {
    backgroundColor: Colors.red,
    color: Colors.white,
    borderRadius: 10,
  },
  enable: {
    backgroundColor: Colors.main,
    color: Colors.black,
    borderRadius: 10,
  },
});

export default Categories;
