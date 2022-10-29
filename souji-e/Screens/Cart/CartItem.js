import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text, Body, Box } from "native-base";
import { ListItem } from "react-native-elements";
import Colors from "../../color";

var { width } = Dimensions.get('window');

const CartItem = (props) => {
  const data = props.item.item;
  const [quanlity, setQuanlity] = useState(props.item.item.quanlity);
  return (
    <ListItem style={styles.listItem} key={Math.random()}>
      <Box style={styles.body}>
        <Text left={10} bold fontSize={20}>
          {data.product.name}
        </Text>
        <Text color={Colors.red} fontWeight={400} marginLeft={10}>
          {data.product.price}vnd
        </Text>
      </Box>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default CartItem;
