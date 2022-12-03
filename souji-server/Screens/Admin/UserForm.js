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

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItemUser from "./ListItemUser";
import Toast from "react-native-toast-message";
import clientAxios from "../../apis";

var { height, width } = Dimensions.get("window");

const UserForm = (props) => {
  const [userList, setUserList] = useState();
  const [userFilter, setUserFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  console.log(props.id);
  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}users`).then((res) => {
        setUserList(res.data);
        setUserFilter(res.data);
        setLoading(false);
      });

      return () => {
        setUserList();
        setUserFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchUser = (text) => {
    if (text == "") {
      setUserFilter(userList);
    }
    setUserFilter(
      userList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const disableUser = (id) => {
    axios
      .put(`${baseURL}users/disable/${id}`)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Disabled success",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("UserForm");
          }, 500);
        }
        setUserFilter(userList);
      })
      .catch((error) =>
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Có lỗi xảy ra",
          text2: "Vui lòng thử lại",
        })
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Users")}
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
          onPress={() => props.navigation.navigate("Product")}
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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Users
        </Text>
      </View>
      <View>
        <View>
          <View style={{ padding: 5 }}>
            <Input
              placeholder=" Search"
              onChangeText={(text) => searchUser(text)}
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
          data={userFilter}
          renderItem={({ item, index }) => (
            <ListItemUser
              {...item}
              navigation={props.navigation}
              index={index}
              disable={disableUser}
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

export default UserForm;
