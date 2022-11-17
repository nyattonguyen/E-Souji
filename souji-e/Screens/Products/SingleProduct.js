import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Container, Heading, Center, Box, TextArea } from "native-base";
import Toast from "react-native-toast-message";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartAction";

import Date from "../../components/Date";
import { Colors } from "../../color";

const { height, width } = Dimensions.get("window");

const SingleProduct = (props) => {
  const { name, price, quanlityH, countInStock } = props;
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <View style={{ width: width, backgroundColor: Colors.black }}>
      <Container style={styles.container}>
        <ScrollView style={{ marginBottom: 80, padding: 5 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentHeader}>{item.name}</Text>
            <Text style={[styles.text, { fontWeight: "400" }]}>
              Thời gian: {item.quanlityH}
            </Text>

            <Text style={styles.title}>Tổng quát</Text>
            <Text style={styles.text}>{item.desc}</Text>
          </View>

          <View style={styles.buttonB}>
            <Text style={styles.text1}>{item.price}VND</Text>
            <TouchableOpacity
              onPress={() => {
                props.addItemToCart(item),
                  Toast.show(
                    {
                      topOffset: 60,
                      type: "success",
                      text1: "Công việc đã được thêm",
                      text2: "Vào hoạt động để kiểm tra",
                    },
                    setTimeout(300)
                  );
              }}
            >
              <Text style={[styles.text2, {}]}>Tiếp tục</Text>
              <Icon
                name="arrow-right"
                size={15}
                style={{
                  position: "absolute",
                  color: Colors.white,
                  right: -20,
                  top: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    </View>
  );
};
const mapStateToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quanlity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: height,
    width: width + 100,
  },

  contentContainer: {
    marginTop: 10,
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 6,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
  title: {
    color: Colors.black,
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "500",
  },
  buttonB: {
    marginBottom: 10,
    backgroundColor: Colors.black,
    flexDirection: "row",
    height: 50,
    width: width - 30,
    margin: 10,
    borderRadius: 10,
    paddingTop: 6,
    justifyContent: "space-around",
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    marginLeft: 10,
  },
  text1: {
    color: Colors.white,
    fontSize: 20,
    marginBottom: 10,
  },
  text2: {
    color: Colors.white,
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button2: {
    color: Colors.white,
    fontSize: 20,
    paddingRight: 10,
    marginBottom: 10,
  },
});
export default connect(null, mapStateToProps)(SingleProduct);
