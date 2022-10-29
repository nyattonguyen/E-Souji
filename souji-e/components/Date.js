import React from "react";
import { View, Text, Box, Center, ScrollView, Button } from "native-base"

const Date = () => {

    return (
        <View>
            <ScrollView borderRadius={5}
                    borderColor={Colors.deepGray}
                    borderBottomWidth={1}
                    borderTopWidth={1}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    bg={Colors.subGreen} >
                    <Box style={styles.boxd} margin={2}  >
                        <Button w={16} h={10} bg={Colors.white} fontWeight={500} rounded="md" shadow={3} _focus={{bg:Colors.main}} >
                            <Text>T2</Text>
                        </Button>
                    </Box>
                    <Box margin={2} >
                        <Button w={16} h={10} bg={Colors.white} fontWeight={500} rounded="md" shadow={3}  _focus={{bg:Colors.main}}>
                            <Text>T3</Text>
                        </Button>
                    </Box>
                    <Box margin={2} >
                        <Button w={16} h={10} bg={Colors.white} fontWeight={500} rounded="md" shadow={3}  _focus={{bg:Colors.main}}>
                            <Text>T4</Text>
                        </Button>
                    </Box>
                    <Box margin={2} >
                        <Button w={16} h={10} bg={Colors.white} fontWeight={500} rounded="md" shadow={3}  _focus={{bg:Colors.main}}>
                            <Text>T5</Text>
                        </Button>
                    </Box>
                    <Box margin={2} >
                        <Button w={16} h={10} bg={Colors.white} fontWeight={500} rounded="md" shadow={3}  _focus={{bg:Colors.main}}>
                            <Text>T6</Text>
                        </Button>
                    </Box>
                    <Box margin={2} >
                        <Button w={16} h={10} bg={Colors.white} fontWeight={500} rounded="md" shadow={3}  _focus={{bg:Colors.main}}>
                            <Text>T7</Text>
                        </Button>
                    </Box>
                    <Box margin={2} >
                        <Button w={16} h={10} bg={Colors.white} fontWeight={500} rounded="md" shadow={3}  _focus={{bg:Colors.main}}>
                            <Text>CN</Text>
                        </Button>
                    </Box>
                
                </ScrollView>
        </View>
    )
}
export default Date