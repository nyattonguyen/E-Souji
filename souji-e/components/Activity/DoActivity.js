import { Center, Image, Box, Spacer, Text, Button, ScrollView, FlatList, Pressable, HStack } from "native-base";
import React from "react";
import { View, StyleSheet }  from "react-native"
import Colors from "../../color";

const DoActivity = () => {
    return (
        <View>
            {/* cong viec dang trong  */}
            {/* <Box flex={1}>
                <Center alignContent="center" alignItems="center" h="full">
                    <Image source={require('../../assets/img/orderempty.png')} w={100} h={100} rounded={5} />
                    <Center>Công việc đang trống</Center>

                </Center>
            </Box> */}

            {/* co cong viec dang cho lam  */}
            <Box h={200}>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View >
                        <Pressable>
                            <HStack space={4} justifyContent="space-between" alignItems="center"
                                    bg={Colors.deepGray} py={5} px={3} >
                                        <Text fontSize={13} color={Colors.black} isTruncated>Order 123</Text>
                                        <Text fontSize={13} color={Colors.steelblue} isTruncated>Dang lam</Text>
                                        <Text px={7} py={1.5} rounded={50} bg={Colors.main} 
                                        _text={{
                                            color:Colors.white,

                                        }}
                                        _pressed={{
                                            bg: Colors.main,
                                        }}>
                                            120000VND
                                        </Text>
                                        

                            </HStack>
                            <Button mt={2} 
                                    borderRadius={10} ml={20} mr={20} bg={Colors.black} 
                                    color={Colors.white}
                             _pressed={{
                                backgroundColor: Colors.main, color:Colors.black
                            }}>Da hoan thanh</Button>
                            <View style={styles.bb} ></View>

                        </Pressable>

                    </View>
                </ScrollView>
            </Box>
        </View>
    )
}
export default DoActivity
const styles = StyleSheet.create({
    
    bb: {
        width:"full",
        borderBottomColor: Colors.black,
        textAlign: "center",
        marginTop:3,
        borderBottomWidth:1,
    }
})