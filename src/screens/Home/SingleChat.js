import { View, Text, ImageBackground, FlatList, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../Constant/Color';
import { SimpleToast } from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { onValue, push, ref, set } from 'firebase/database';
import { firebaseDatabase } from '../../firebase';
import CustomMessage from '../../components/CustomMessage';
import Header from '../../components/Header';
import { FacebookAuthProvider } from 'firebase/auth';
import ListItem from './../../components/ListItem';

const SingleChat = ({ route }) => {
    useEffect(() => {
        console.log("route : " + JSON.stringify(route))
    }, [])
    const selectedUser = route.params.selectedUser
    const currentUser = useSelector((state) => state.user.userData)
    const [message, setMessage] = useState('')
    const [chatList, setChatList] = useState([])
    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;
    const sendingMess = () => {
        if (message === '' && msgvalid(message) === 0) {
            SimpleToast.show("type something")
            return false
        }

        const messageData = {
            message: message,
            from: currentUser.userId,
            to: selectedUser.userId,
            messageType: "text",
            timestamp: (new Date()).getTime(),
        }
        const messageRef = push(ref(firebaseDatabase, 'messages/' + selectedUser.roomID))
        messageData.id = messageRef.key
        set(messageRef, messageData).then(() => {
            setMessage('')
        }).catch((error) => {

        })
    }
    useEffect(() => {
        setChatList([])
        const messageUrl = ref(firebaseDatabase, 'messages/' + selectedUser.roomID);
        onValue(messageUrl, (snapshot) => {
            if (snapshot.exists()) {
                const chatData = Object.values(snapshot.val())
                setChatList(chatData)
            }
        })
    }, [selectedUser.roomID])
    return (
        <View
            style={{ flex: 1 }}
        >
            <Header
                userName={selectedUser.username}
            />

            <ImageBackground
                source={{ uri: "https://th.bing.com/th/id/OIP.vGgOuAwmYxS1p8CEVW1QQwHaEK?w=328&h=184&c=7&r=0&o=5&pid=1.7" }}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end'

                }}
            >

                <ScrollView
                    contentContainerStyle={{
                        //    position: 'relative',
                        width: '100%',
                        //height: "100%",
                        bottom: 0,
                        //        flexDirection: 'column'


                    }}

                >

                    {/* <FlatList
                        style={{
                            position: 'absolute',
                            width: '100%',
                            bottom: 0

                        }}
                        //  scrollEnabled={false}
                        data={chatList}
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <CustomMessage
                                    sender={item.from == currentUser.userId}
                                    item={item}
                                />
                            )
                        }}
                    /> */}
                    {chatList.length > 0 && chatList ? chatList.map((item) => (
                        <CustomMessage
                            key={item.userId}
                            sender={item.from == currentUser.userId}
                            item={item}
                        />
                    )) : null}
                </ScrollView>
            </ImageBackground>

            <View
                style={{
                    width: "100%"
                    , backgroundColor: "green",
                    flexDirection: 'row',
                    height: "10%",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TextInput
                    //   multiline
                    style={
                        styles.input
                    }
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    onSubmitEditing={() => sendingMess()}
                    placeholder='type something'
                />
            </View>
        </View >

    )
}
const styles = StyleSheet.create({
    input: {


        width: '80%',
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 30,
        alignItems: 'center'
    }
})
export default SingleChat;
