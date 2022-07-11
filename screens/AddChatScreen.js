import { addDoc, collection } from 'firebase/firestore';
import { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';


const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    const createChat = async () => {

        await addDoc(collection(db, 'chats'), {
            chatName: input,
        }).then(() => {
            navigation.goBack();
        }).catch(error => alert(error));
    }

    useLayoutEffect(() => {

        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#2665e2'
            },
            title: "Create new chat",
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: '#000' },
            headerTintColor: '#000',
        })

    }, [navigation])

    return (
        <View style={styles.container}>
            <Input placeholder='Enter a chat name' value={input} onSubmitEditing={() => createChat()} onChangeText={text => setInput(text)} leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color='#000' />
            } />
            <Button disabled={!input} title='Create Chat' onPress={() => createChat()} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '5%',
    },
})