import { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth, createUserWithEmailAndPassword, updateProfile } from "../firebase";

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    useLayoutEffect(() => {

        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#103f9c'
            },
        })
    }, [navigation])

    const signUp = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {

                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: imgUrl || "https://sexygipfel.de/gipfel.png"
                })

            }).catch(err => {
                alert(err.message);
            })
    }

    const changeEmailText = (text) => {
        setEmail(text.replace(/[^a-zA-Z0-9@.]/g, ""))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <Text h3 style={{ marginBottom: 50, }}>
                Create your Account !
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder='Username'
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    placeholder='E-Mail'
                    type='email'
                    value={email}
                    onChangeText={text => changeEmailText(text)}
                />
                <Input
                    placeholder='Password'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    placeholder='Profile Picture URL (optional)'
                    type='text'
                    value={imgUrl}
                    onChangeText={text => setImgUrl(text)}
                    onSubmitEditing={() => signUp()}
                />
            </View>

            <Button
                title='Sign Up'
                onPress={() => signUp()}
                containerStyle={styles.button}
                buttonStyle={{ backgroundColor: '#103f9c' }}
                raised
            />

        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    inputContainer: {
        width: '80%',
    },
    button: {
        width: '50%',
        marginTop: 11,
    },
})