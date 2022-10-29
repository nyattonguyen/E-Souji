import { Center, Image, Box, Spacer, Text, Button, ScrollView, FlatList, Pressable, HStack, VStack } from "native-base";
import React from "react";
import { View, StyleSheet }  from "react-native"
import Colors from "../../color";
const FnActivity = () => {
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={true}>
                    <View style={styles.item}>
                        <Pressable>
                        
                            <HStack space={4} justifyContent="space-between" alignItems="center"
                                    bg={Colors.deepGray} py={5} px={3} >
                                        <Text fontSize={13} color={Colors.black} isTruncated>Order 123</Text>
                                        <Text px={7} py={1.5} rounded={50} bg={Colors.main} 
                                        _text={{
                                            color:Colors.white,

                                        }}
                                        _pressed={{
                                            bg: Colors.main,
                                        }}>
                                            120000VND
                                        </Text>
                                        <Text fontSize={13} color={Colors.red} isTruncated>Hoàn thành</Text>

                            </HStack>
                            
                        </Pressable>
                    </View>
                    
                </ScrollView>
        </View>
    )
}
export default FnActivity

const styles = StyleSheet.create({
    item: {
        marginBottom:4,
    }
})
