import { useLayoutEffect } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Avatar } from 'react-native-elements'

const ChatScreen = ({ navigation, route }) => {
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
                <View>
                    <TouchableHighlight>
                        <FontAwesome name="video-camera" size={24} color='#000' />
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <FontAwesome name="call" size={24} color='#000' />
                    </TouchableHighlight>
                </View>
            )
        })

    }, [navigation])

    return (
        <View>
            <Text>ChatScreen</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatName: {
        marginLeft: 10,
        fontWeight: '700',
        fontSize: 20,
    }
})