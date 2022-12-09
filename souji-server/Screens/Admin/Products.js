import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Box, Input, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../color";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600", marginLeft: 10 }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Pin</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  // const [productPin, setProductPin]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };
  const reRender = () => {
    setProductFilter(productFilter + 1);
    // this.forceUpdate();
  };
  const pinProduct = (id) => {
    axios
      .put(`${baseURL}products/get/pin/${id}`)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Pin success",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
        setProductFilter([...productList, res.data]);
      })
      .catch((error) => console.log(error));
  };

  const unPinProduct = (id) => {
    axios
      .put(`${baseURL}products/get/unpin/${id}`)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "un pin success",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
        setProductFilter(productFilter);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Orders")}
        >
          <Icon
            style={styles.icon1}
            name="shopping-bag"
            size={18}
            color="white"
          />
          <Text style={styles.buttonText}>Orders</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <Icon style={styles.icon2} name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Products</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Categories")}
        >
          <Icon style={styles.icon3} name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("UserForm")}
        >
          <Icon style={styles.icon4} name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </Button>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Product
        </Text>

        <View>
          <View
            style={{
              padding: 5,
              width: width,
              marginTop: -70,
              marginBottom: -60,
            }}
          >
            <Input
              margin={20}
              placeholder=" Search"
              onChangeText={(text) => searchProduct(text)}
            ></Input>
          </View>
        </View>
      </View>
      <View></View>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
              pin={pinProduct}
              unpin={unPinProduct}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 4,
    width: width / 4,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 0,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    width: width,
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 4,
    color: Colors.black,
    fontSize: 24,
  },
  btn: {
    margin: 10,
    fontSize: 20,
    backgroundColor: "none",
  },
  icon1: {
    color: Colors.black,
    marginLeft: 16,
  },
  icon2: {
    color: Colors.black,
    marginLeft: 22,
  },
  icon3: {
    color: Colors.black,
    marginLeft: 28,
  },
  icon4: {
    color: Colors.black,
    marginLeft: 13,
  },
});

export default Products;
