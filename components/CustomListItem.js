import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // return db
    // .collection('chats')
    //     .doc(id)
    //     .collection('messages')
    //     .orderBy('timestamp', 'desc')
    //     .onSnapshot(snapshot => setChatMessages(snapshot.docs.map(doc => doc.data())))

    return onSnapshot(collection(db, "chats", id, "messages"), (snapshot) => {
      setChatMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  if (chatMessages?.[0]) {
    return (
      <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
        <Avatar
          rounded
          source={{
            uri:
              chatMessages?.[0]?.photoURL || "https://sexygipfel.de/gipfel.png",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  } else {
    return (
      <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
        <Avatar
          rounded
          source={{
            uri: "https://sexygipfel.de/gipfel.png",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            {chatName}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  }
};

export default CustomListItem;

const styles = StyleSheet.create({});
