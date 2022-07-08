import { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "../firebase";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { uuidv4 } from "@firebase/util";
import { DefaultTheme, ProgressBar } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pbImg, setPbImg] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#103f9c",
            },
        });
    }, [navigation]);

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: pbImg,
                });
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const changeEmailText = (text) => {
        setEmail(text.replace(/[^a-zA-Z0-9@.]/g, ""));
    };

    const openImagePickerAsync = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required !");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.cancelled) {

            const storage = getStorage();
            const imageRef = ref(storage, `profileImages/${uuidv4()}`);
            const img = await fetch(pickerResult.uri);
            const blob = await img.blob();

            const uploadTask = uploadBytesResumable(imageRef, blob).on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                    console.log('Upload is ' + progress * 100 + '% done');
                    setUploadProgress(progress);
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setPbImg(downloadURL);
                    });
                }
            );

        }
    }

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
          ...DefaultTheme.colors,
          primary: '#000000',
          accent: '#6d0ff1',
        },
      };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text h3 style={{ marginBottom: 50 }}>
                Create your Account !
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Username"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="E-Mail"
                    type="email"
                    value={email}
                    onChangeText={(text) => changeEmailText(text)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button
                    title="Upload Profile Picture"
                    onPress={() => openImagePickerAsync()}
                    buttonStyle={{ backgroundColor: "#103f9c" }}
                />
                <ProgressBar progress={uploadProgress} theme={theme} />
            </View>

            <Button
                title="Sign Up"
                onPress={() => signUp()}
                containerStyle={styles.button}
                buttonStyle={{ backgroundColor: "#103f9c" }}
                raised
            />
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    inputContainer: {
        width: "80%",
    },
    button: {
        width: "50%",
        marginTop: 11,
    },
});
