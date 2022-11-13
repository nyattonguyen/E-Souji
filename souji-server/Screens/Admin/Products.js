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

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
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
          onPress={() => props.navigation.navigate("Users")}
        >
          <Icon style={styles.icon3} name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </Button>
      </View>
      <View>
        <View>
          <View style={{ padding: 5 }}>
            <Input
              placeholder=" Search"
              onChangeText={(text) => searchProduct(text)}
            ></Input>
          </View>
        </View>
      </View>

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
    margin: 20,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
  btn: {
    marginRight: 3,
  },
  icon1: {
    marginLeft: 16,
  },
  icon2: {
    marginLeft: 22,
  },
  icon3: {
    marginLeft: 28,
  },
});

export default Products;
