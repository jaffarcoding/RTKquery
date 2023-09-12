import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
function TextCom(props: any): JSX.Element {
    const { currData, curpop } = props
    const onChangeValue = (value: String) => {
        currData(value)
    }
    return (
        <View style={[styles.textconatiner]}>
            <TextInput placeholder="Search..." onChangeText={(value) => onChangeValue(value)} style={[styles.textinputs]} />
            <Pressable onPress={() => props.openCreateModal(true)} style={[styles.addiconprassable]} >
                <Icon name="add" size={40} color={'black'} />
            </Pressable>
        </View>
    );
}

export default TextCom;
const styles = StyleSheet.create({
    textconatiner: {
        backgroundColor: 'red',
        flexDirection: 'row',
        gap: 10,
        height: '20%',
        backgroundColor: '#6495ed',
        alignItems: 'center',
        justifyContent: 'flex-end',
        
    },
    textinputs: {
        borderRadius: 15,
        backgroundColor: 'white',
        width: '80%',
        padding: 10,
        marginBottom: 10
    },
    addiconprassable: {
        height: '100%',
        marginRight: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12
    }
})