import React, { useState } from "react";
import { Dimensions, View, Button, StyleSheet, Pressable } from "react-native";
import {
  Container,
  Text,
  Box,
  Center,
  Radio
} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox, ListItem } from "react-native-elements";
// import {RadioButtonRN} from 'radio-buttons-react-native/RadioButtonRN';
import { RadioButton } from 'react-native-paper';
import Colors from "../../../color";
import { Picker } from "@react-native-picker/picker";

var { width } = Dimensions.get("window");

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Momo", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Container>
      <View style={styles.container}>
        <Box>
          <Center style={styles.header}>
            <Text textAlign="center" fontSize={22}>
              Chọn phương thức thanh toán
            </Text>
          </Center>
        </Box>
        <Box>

            {methods.map((item, index) => {
              return (
              <ListItem
                key={item.name}
                style={styles.page}
                onPress={() => setSelected(item.value)}
              >
                  <View style={styles.itemMethod}>
                    <Text>{item.name}</Text>
                    
                    
                  </View>
                  <View>
                  <CheckBox
                      style={styles.checkbox}
                      checked={selected == item.value} 
                     />
                  </View>
                  
              </ListItem>
            );
          })}{
            selected == 3 ? (
              <Picker 
                style={styles.picker}
                mode="dropdown"
                dropdownIconColor={Colors.black}
                selectedValue={card}
                onValueChange={(x) => setCard(x)}
                accessibilityElementsHidden={Colors.main}
                >{paymentCards.map((c, index) => {
                  return <Picker.Item label={c.name} value={c.name} />
                } )}

              </Picker>
            ):null}
            <View >
              <Button 
                        title={"Confirm"} 
                        onPress={() => props.navigation.navigate("Confirm", { order })}/>
            </View>
                


        </Box>
      </View>
    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: "center",
  },
  page: {
    width: width - 20,
    alignItems: "center",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    shadowOpacity: 1,
    flexDirection: "row",
  },
  itemMethod: {
    justifyContent: "space-around",
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    alignContent: "center",
    width: width,
  },
  checkbox: {
    zIndex:1
  },
  picker:{
    height:30,
    backgroundColor: Colors.whitesmoke,
  }
});
