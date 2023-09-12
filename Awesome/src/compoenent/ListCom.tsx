import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Alert, Modal } from "react-native";
import { useDeleteDataByIdMutation, useGetDataByIdQuery } from "../service/detapidata";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon1 from "react-native-vector-icons/AntDesign"
function ListCom(props: any): JSX.Element {
    console.log(props.id, "popsss")
    const navigation = useNavigation();
    const { curdata } = props
    const [save, setSave] = useState("");
    const [deleted, { isError, isSuccess }] = useDeleteDataByIdMutation();
    const handler = async (item: string) => {
        setSave(item)
        deleted(item)
    }
    const presshandler = () => {
        navigation.navigate("DetailScreen", {
            id: props.id
        })
    }
    useEffect(() => {
        if (isSuccess) {
            curdata(save)
        } else {
            curdata("")
            if (isError) {
                Alert.alert("Something went wrong please try again")
            }
        }
    }, [isSuccess, save])
    return (
        <View style={[styles.listscontainer]}>
            <View style={{ width: '80%' }}>
                <Text style={{ paddingBottom: 5, paddingTop: 5 }}>
                    {props.title}
                </Text>
            </View>
            <View style={{ gap: 5 }}>
                <Pressable onPress={() => handler(props.id)}>
                    <Icon name="delete" size={25} color="black" />
                </Pressable>
                <Pressable onPress={presshandler}>
                    <Icon1 name="edit" size={25} color="black" />
                </Pressable>
            </View>
        </View>
    );
}
export default ListCom;
const styles = StyleSheet.create({
    listscontainer: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
    }
})