import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const subtitle = "";
  if (subtitle) {
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
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {subtitle}
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
