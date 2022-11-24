import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";

import moment from "moment";
import { Colors } from "../../color";

const Test = () => {
  let datesWhitelist = [
    {
      start: moment,
      end: moment().add(3, "days"),
    },
  ];
  let datesBlacklist = [moment().add(1, "days")];
  const [date, setDate] = useState(new Date());
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        flex: 1,
        borderColor: Colors.sdGray,
      }}
    >
      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: "blue",
        }}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: "black" }}
        calendarColor={Colors.white}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        highlightDateNumberStyle={{ color: Colors.blue }}
        highlightDateNameStyle={{ color: Colors.blue }}
        disabledDateNameStyle={{ color: "grey" }}
        iconContainer={{ flex: 0.1 }}
        disabledDateNumberStyle={{ color: "grey" }}
        selectedDate={date}
        onDateSelected={(e) => setDate(e)}
        scrollable={true}
      />
      <Text>{moment(date).format("DD-MM-YYYY")} </Text>
    </View>
  );
};
export default Test;
