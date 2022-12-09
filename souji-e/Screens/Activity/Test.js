import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";

import moment from "moment";
import { Colors } from "../../color";
import { Button } from "native-base";
import clientAxios from "../../apis";

const Test = () => {
  const [paya, setPaya] = useState();
  const pay = () => {
    clientAxios.post(`/orders/pay`).then((res) => {
      console.log(res.data);
      setPaya(res.data);
    });
  };

  return (
    <View>
      <Text>Chao ban</Text>
      <Button onPress={() => pay()}>Thanh Toan</Button>
    </View>
  );
};
export default Test;
