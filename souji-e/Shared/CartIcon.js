import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";
import Colors from "../color";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 11,
    height:18,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
    backgroundColor:Colors.main,
    color:Colors.white,
    borderRadius:22,
  },
  text: {
    fontSize: 12,
    width: 15,
    fontWeight: "bold",
    paddingLeft:4,
    color:Colors.black,
    

  },
});

export default connect(mapStateToProps)(CartIcon);