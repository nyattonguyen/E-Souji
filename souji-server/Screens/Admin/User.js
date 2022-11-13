import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, ScrollView } from "native-base";
import UserCard from "../../Shared/UserCard";

const { height } = Dimensions.get("window");

const User = (props) => {
  const [userList, setUserList] = useState();
  const [userFilter, setUserFilter] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
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

  // const getUsers = () => {
  //   axios
  //     .get(`${baseURL}users`)
  //     .then((x) => {
  //       setUserList(x.data);
  //     })
  //     .catch((error) => console.log(error));
  // };
  const searchUser = (text) => {
    if (text == "") {
      setUserFilter(userList);
    }
    setUserFilter(
      userList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const deleteUser = (id) => {
    axios
      .delete(`${baseURL}users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const users = userFilter.filter((item) => item.id !== id);
        setUserFilter(users);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView>
      <View>
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
              <UserCard
                navigation={props.navigation}
                {...item}
                index={index}
                delete={deleteUser}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </ScrollView>
  );
};
export default User;

const styles = StyleSheet.create({
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
