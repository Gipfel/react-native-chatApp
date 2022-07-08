import { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import {
  firebase,
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebase";
import * as ImagePicker from "expo-image-picker";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [pbImg, setPbImg] = useState("");
  const [finalImg, setFinalImg] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#103f9c",
      },
    });
  }, [navigation]);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, toLowerCase(email), password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            finalImg || pbImg || imgUrl || "https://sexygipfel.de/gipfel.png",
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
    console.log(pickerResult);
    setPbImg(pickerResult.uri);
    firebaseImgUpload();
  };

  const firebaseImgUpload = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, new Date().toISOString());

    const uploadTask = uploadBytesResumable(storageRef, pbImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        alert(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFinalImg(downloadURL);
        });
      }
    );
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
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imgUrl}
          onChangeText={(text) => setImgUrl(text)}
          onSubmitEditing={() => signUp()}
        />
        <Button
          title="Upload Profile Picture"
          onPress={() => openImagePickerAsync()}
        />
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
