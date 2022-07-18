import { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
import { auth, db, signOut } from '../firebase'
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore'

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])

  useEffect(() => {
    return onSnapshot(collection(db, 'chats'), (snapshot) => {
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace('Login')
    }).catch(err => {
      alert(err)
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#2665e2'
      },
      title: "GIIIPFEL's ChatApp",
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: '#000' },
      headerTintColor: '#000',
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => signOutUser()} activeOpacity={0.5} style={{ padding: 15 }}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: 80
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color='#000' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons name='pencil' size={24} color='#000' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', { id, chatName })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  }
})
