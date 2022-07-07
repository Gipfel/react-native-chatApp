import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
import { Button, Input, Image } from 'react-native-elements'
import { auth, signInWithEmailAndPassword } from "../firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return auth.onAuthStateChanged(authUser => {
            if (authUser)
                navigation.replace("Home");
            else {
                navigation.reset();
            }
        })
    }, [])

    const signIn = () => {
        signInWithEmailAndPassword(auth, toLowerCase(email), password)
            .catch((err) => {
                alert(err.message);
            });
    }

    const setEmailInput = (text) => {
        setEmail(text.replace(/[^a-zA-Z0-9@.]/g, ""))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <Image source={{ uri: "https://sexygipfel.de/gipfel.png" }} style={styles.logo} />

            <View style={styles.inputContainer}>
                <Input placeholder='E-Mail' autoFocus type='email' value={email} onChangeText={text => setEmailInput(text)} />
                <Input placeholder='Password' secureTextEntry type='password' value={password} onChangeText={text => setPassword(text)} />
            </View>

            <Button containerStyle={styles.button} title='Login' onPress={signIn} />
            <Button containerStyle={styles.button} title='Sign Up' onPress={() => navigation.navigate('Sign Up')} type='outline' />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 25,
    },
    inputContainer: {
        width: '80%',
    },
    button: {
        width: '50%',
        marginTop: 11,
    },
});