import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useLayoutEffect, useState } from 'react'
import { Keyboard, ScrollView, TextInput, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-web'
import { auth, db } from '../firebase'
import * as firebase from 'firebase/app'
import { doc, collection, addDoc, onSnapshot, getDoc, serverTimestamp, getDocs, orderBy, query, QuerySnapshot } from 'firebase/firestore'

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('')
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
          <Avatar rounded source={{ uri: messages[0]?.data.photoURL }} />
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
  }, [navigation, messages])

  const sendMessage = () => {
    // Check if input is empty or only contains whitespace
    if (input.trim() === '') return

    Keyboard.dismiss()

    // db.collection('chats').doc(route.params.id).collection('messages').add({
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     message: input,
    //     displayName: auth.currentUser.displayName,
    //     email: auth.currentUser.email,
    //     photoURL: auth.currentUser.photoURL,
    // })

    addDoc(collection(db, 'chats', route.params.id, 'messages'), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput('')
  }

  useLayoutEffect(() => {
    // return db
    //     .collection('chats')
    //     .doc(route.params.id)
    //     .collection('messages')
    //     .orderBy('timestamp', 'asc')
    //     .onSnapshot(snapshot => setMessages(
    //         snapshot.docs.map(doc => ({
    //             id: doc.id,
    //             data: doc.data()
    //         }))
    //     ));

    return onSnapshot(
      query(
        collection(db, 'chats', route.params.id, 'messages'),
        orderBy('timestamp', 'asc')
      ),
      (queriedSnap) => setMessages(
        queriedSnap.docs.map(qDoc => ({
          id: qDoc.id,
          data: qDoc.data()
        }))
      )
    )
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container} keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

          <>

            <ScrollView>
              {messages.map(({ id, data }) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.sender}>
                    <Avatar
                                            // Web
                        containerStyle={{
                            position: 'absolute',
                            right: -8,
                            bottom: -10
                          }}
                        position='absolute' rounded size={30} right={-8} bottom={-10} source={{
                            uri: data.photoURL
                          }}
                      />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                                            // Web
                        containerStyle={{
                            position: 'absolute',
                            left: -8,
                            bottom: -10
                          }}
                        position='absolute' rounded size={30} left={-8} bottom={-10} source={{
                            uri: data.photoURL
                          }}
                      />
                    <Text style={styles.recieverText}>{data.message}</Text>
                    <Text style={styles.recieverName}>{data.displayName}</Text>
                  </View>
                )
              ))}
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
    alignItems: 'center'
  },
  chatName: {
    marginLeft: 20,
    fontWeight: '700',
    fontSize: 20
  },
  container: {
    flex: 1
  },
  sender: {
    padding: 15,
    backgroundColor: '#4a81f7',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 24,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  senderText: {
    color: '#fff',
    fontWeight: '500',
    paddingHorizontal: 7,
    fontSize: 16
  },
  reciever: {
    padding: 15,
    backgroundColor: '#2b53aa',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginLeft: 24,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
    alignItems: 'center'
  },
  recieverText: {
    color: '#fff',
    fontWeight: '500',
    marginRight: 12,
    fontSize: 16
  },
  recieverName: {
    fontStyle: 'italic',
    color: '#e9e9e9'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15
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
    borderRadius: 30
  }
})
