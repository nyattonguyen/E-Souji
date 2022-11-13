import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import { Colors } from "../color";
import Icon from "react-native-vector-icons/FontAwesome";

const UserCard = (props) => {
  const [token, setToken] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    return () => {};
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.index % 2 == 0 ? "#909A95" : "aquamarine",
        },
      ]}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor={Colors.black}
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>

            <Button
              title="Delete"
              color={Colors.red}
              onPress={() => [props.delete(props._id), setModalVisible(false)]}
            ></Button>
          </View>
        </View>
      </Modal>
      {/* modal  */}
      <TouchableOpacity
        style={styles.containerHeader}
        onLongPress={() => setModalVisible(true)}
      >
        <Text>ID user #{props.id}</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "500" }}>Tên: {props.name}</Text>
        <Text>Email: {props.email}</Text>
        <Text>SDT: {props.phone}</Text>
        <Text>Địa chỉ: {props.street} </Text>
        <Text>Quận: {props.country}</Text>
        <Text>Thành phố: {props.city}</Text>
      </View>
    </View>
  );
};
export default UserCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    flex: "1",
    borderRadius: 10,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  containerHeader: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: Colors.subGreen,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },

  btn: {
    width: 90,
    height: 36,
    padding: 3,
    margin: 10,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
