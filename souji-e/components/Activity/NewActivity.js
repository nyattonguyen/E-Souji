import { Center, Image, Box, Spacer, Text, Button, ScrollView, FlatList, Pressable, HStack } from "native-base";
import React from "react";
import { View, StyleSheet }  from "react-native"
import Colors from "../../color";


const NewActivity = () => {
    return (
        <View>
            {/* cong viec dang trong  */}
            {/* <Box flex={1}>
                <Center alignContent="center" alignItems="center" h="full">
                    <Image source={require('../../assets/img/orderempty.png')} w={100} h={100} rounded={5} />
                    <Center>Công việc đang trống</Center>
                    <Spacer/>
                    <Button  shadow={1} style={styles.button}>Đăng việc ngay</Button>

                </Center>
            </Box> */}

            {/* co cong viec dang cho lam  */}
            <Box>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View>
                        <Pressable>
                            <HStack space={4} justifyContent="space-between" alignItems="center"
                                    bg={Colors.deepGray} py={5} px={3} >
                                        <Text fontSize={13} color={Colors.black} isTruncated>Order 123</Text>
                                        <Text fontSize={13} color={Colors.steelblue} isTruncated>Cho duyet</Text>
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
                        </Pressable>
                    </View>
                </ScrollView>
            </Box>
        </View>
    )
}
export default NewActivity

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.black,
        color:Colors.white,
        borderRadius:8,
        marginTop:30,

    }
})