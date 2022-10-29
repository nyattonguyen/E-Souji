import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighLight,
    TouchableOpacity,
    Dimensions,
    Button,
    Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import Colors from "../../color";

var { width } = Dimensions.get("window");

const ListItem = (props) => {

    const [modalVisible, setModalVisible] = useState(false)

    return(
        <View>      
        <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            underlayColor={Colors.black}
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{ 
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 5,
                                right: 10
                            }}
                        >
                            <Icon name="close" size={20} />
                        </TouchableOpacity>
                        <Button title="Edit" color={Colors.blue}                      
                        onPress={() => [
                            props.navigation.navigate("ProductForm", { item: props}),
                            setModalVisible(false)
                        ]}
                        >
                        </Button>
                        <Button title="Delete" color={Colors.red}                        
                        onPress={() => [props.delete(props._id), setModalVisible(false)]}
                        >
                        </Button>
                    </View>
                </View>

            </Modal>      
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Product Detail", { item: props})}
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, {
                    backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro"
                }]}>                
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.category.name}</Text>
                <Text style={styles.item}>{props.price} VND</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 4
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: Colors.white,
        fontWeight: "bold"
    }
})

export default ListItem;