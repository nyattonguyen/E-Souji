import React, {useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";  
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../Shared/OrderCard";
import { ScrollView } from "native-base";

const Orders = (props) => {
    const [orderList,setOrderList] = useState();
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                getOrders();
                return () => {
                    setOrderList();
                }
            },[]
        )
    )
    AsyncStorage.getItem("jwt")
        .then((res) => {
            setToken(res)
        })
        .catch((error) => console.log(error))

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }

    const getOrders = () => {
        axios
        .get(`${baseURL}orders`)
        .then((x) => {
            setOrderList(x.data);
        })
        .catch((error) => console.log(error));
    }
    return (
        <ScrollView>
            <View>
            <FlatList
                data={orderList}
                renderItem={({item}) => (
                <OrderCard navigation={props.navigation} {...item} />
                )}
                keyExtractor={(item) => item.id }
                />
        </View> 
        </ScrollView>
    )
}
export default Orders