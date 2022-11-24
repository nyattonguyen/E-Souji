import React, { useState } from "react";
import { View, Text } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Test1 = () => {
  const [time, setTime] = useState(new Date());

  return (
    <View>
      <RNDateTimePicker
        mode="time"
        value={time}
        is24Hour={true}
        onChange={(e) => setTime(e)}
        testID="dateTimePicker"
        display="spinner"
      />
      <View>{/* <Text>{time}</Text> */}</View>
    </View>
  );
};
export default Test1;
