import { Heading, Image } from "native-base";
import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../color";

var { width } = Dimensions.get('window')

const Header = () => {
   
        return(
            <SafeAreaView style={styles.header}>
                <View style={styles.headerLogo}>
                <Image 
                    source={require("../assets/image/react.png")}
                    size="xl"
                    style={{ height: 60 }}
                />
                </View>
                <Heading  fontSize={16} pl={3} mt={5}>Chào mừng bạn đến với Souji</Heading>
            </SafeAreaView>
        )
    }
    
    const styles = StyleSheet.create({
        header: {
            width: width,
            flexDirection: 'row',
            alignContent: "center",
            justifyContent: "center",
            padding:5,
            backgroundColor: Colors.main
        },
        headerLogo:{
            width:60,
            height:60,
            borderRadius: 35,
            backgroundColor:Colors.black,
            alignItems:"center"
        }
    })


export default Header

