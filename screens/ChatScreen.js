




// https://youtu.be/MJzmZ9qmdaE?t=10413






import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useLayoutEffect, useState } from 'react'
import { Keyboard, ScrollView, TextInput } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-web'
import firebase from 'firebase/compat/app';
import { db, auth } from '../firebase'

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {

        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#2665e2'
            },
            title: route.params.chatName,
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: '#000' },
            headerTintColor: '#000',
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={styles.headerContainer}>
                    <Avatar rounded source={{ uri: "https://sexygipfel.de/gipfel.png" }} />
                    <Text style={styles.chatName}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={[styles.headerContainer, { justifyContent: 'space-evenly', width: 120 }]}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faVideo} size={24} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faPhone} size={24} color='#000' />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })

        setInput('');
    }

    useLayoutEffect(() => {
        return db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.maps(doc => {
                id: doc.id,
                    data: doc.data()
            })
        ))
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container} keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                    <>

                        <ScrollView>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View>
                                        <Avatar />
                                        <Text></Text>
                                    </View>
                                ) : (
                                    <View></View>
                                )
                            )}
                        </ScrollView>

                        <View style={styles.footer}>
                            <TextInput style={styles.textInput} placeholder='Enter Message' value={input} onChangeText={text => setInput(text)} onSubmitEditing={() => sendMessage()} />
                            <TouchableOpacity activeOpacity={0.5} onPress={() => sendMessage()}>
                                <FontAwesomeIcon icon={faPaperPlane} size={28} color='#2b68e6' />
                            </TouchableOpacity>
                        </View>

                    </>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatName: {
        marginLeft: 20,
        fontWeight: '700',
        fontSize: 20,
    },
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#f3f3f3',
        padding: 10,
        paddingLeft: 20,
        color: '#000',
        borderRadius: 30,
    },
})