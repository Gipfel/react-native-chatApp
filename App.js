import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

const gloabalScreenOptions = {
  headerStyle: {
    backgroundColor: "#2C6BED",
  },
  headerTitleStyle: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={gloabalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
