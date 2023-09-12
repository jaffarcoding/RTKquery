import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAddNewPostMutation, useGetDataByIdQuery } from "../service/detapidata";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const ListScreen = () => {
    const [texttitle, setTexttitle] = useState("");
    const [textbody, setTextBody] = useState("");
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params
    const res = useGetDataByIdQuery(id);
    const [addnewupdate, { isSuccess, isError, isLoading }] = useAddNewPostMutation();
    const updatehandler = async () => {
        await addnewupdate({ texttitle, textbody });
        //const res = useGetDataByIdQuery(id);
    }
    useEffect(() => {
        if (isSuccess) {
            navigation.navigate("Home", {
                updatetitle: texttitle,
                updatebody: textbody
            })
        } else {
            if (isError) {
                Alert.alert("Something get Wrong Try Agin")
            }
        }
        console.log("Clickable id is" + id);
    }, [isSuccess, texttitle, textbody, navigation])
    return (
        <View style={[styles.listcontainer]}>
            <View style={[styles.listconatinermaterial]}>
                <TextInput onChangeText={(value) => setTexttitle(value)} multiline style={[styles.textinputs]} defaultValue={res?.currentData?.title} />
                <TextInput onChangeText={(value) => setTextBody(value)} multiline style={[styles.textinputs]} defaultValue={res?.currentData?.body} />
                <View style={[styles.btncontainer]}>
                    <TouchableOpacity onPress={updatehandler} style={[styles.touchablercontainer]}>
                        <Text style={[styles.touchabletext]}>
                            Update
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default ListScreen;

const styles = StyleSheet.create({
    listcontainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    listconatinermaterial: {
        height: '75%',
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    textinputs: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '92%'
    },
    btncontainer: {
        width: '60%',
        backgroundColor: 'blue',
        borderRadius: 10
    },
    touchablercontainer: {
        alignItems: 'center',
        width: '100%',
        padding: 8,
        backgroundColor: 'black',
        borderRadius: 10
    },
    touchabletext: {
        fontSize: 18,
        color: 'white'
    }
})