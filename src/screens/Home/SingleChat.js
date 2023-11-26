import {
    View,
    Text,
    ImageBackground,
    FlatList,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../Constant/Color';
import { SimpleToast } from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { onValue, push, ref, set, update } from 'firebase/database';
import { firebaseDatabase, storage } from '../../firebase';
import CustomMessage from '../../components/CustomMessage';
import Header from '../../components/Header';
import { FacebookAuthProvider } from 'firebase/auth';
import ListItem from './../../components/ListItem';
import ImagePicker from 'react-native-image-crop-picker';
import { Buffer } from 'buffer';
import {
    ref as refStorage,
    getDownloadURL,
    uploadFile,
    uploadBytes,

} from 'firebase/storage';
const SingleChat = ({ route }) => {
    const selectedUser = route.params.selectedUser;
    const currentUser = useSelector(state => state.user.userData);
    const [message, setMessage] = useState('');
    const [chatList, setChatList] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;
    const sendingMess = () => {
        if (message === '' && msgvalid(message) === 0) {
            SimpleToast.show('type something');
        }

        let messageData = {
            message: message,
            from: currentUser.userId,
            to: selectedUser.userId,
            timestamp: new Date().getTime(),
            type: 'text',
        };
        updateMess(messageData);
    };
    const updateMess = messageData => {
        const messageRef = push(
            ref(firebaseDatabase, 'messages/' + selectedUser.roomID),
        );
        messageData.id = messageRef.key;
        set(messageRef, messageData)
            .then(() => {
                setMessage('');
                console.log(
                    'ref :  ' +
                    ref(
                        firebaseDatabase,
                        'chatList/' + selectedUser.userId + '/' + currentUser.userId,
                    ),
                );
            })
            .catch(error => { });

        update(
            ref(
                firebaseDatabase,
                'chatList/' + selectedUser.userId + '/' + currentUser.userId,
            ),
            {
                lastestMessage: messageData.message,
            },
        )
            .then(() => {
                console.log('hêlo: ' + messageData.message);
            })
            .catch(error => { });
        update(
            ref(
                firebaseDatabase,
                'chatList/' + currentUser.userId + '/' + selectedUser.userId,
            ),
            {
                lastestMessage: messageData.message,
            },
        )
            .then(() => { })
            .catch(error => { });
    };
    const UpdateChatList = () => { };
    const UploadImage = () => {
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: false,
            }).then(async image => {
                let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
                let ext = imgName.split('.').pop();
                let name = imgName.split('.')[0];
                let newName = name + Date.now() + '.' + ext;
                const localFile = image.path;
                const storageImageRef = refStorage(storage, 'chatMedia/' + newName);
                const snapshot = await uploadBytes(storageImageRef, localFile);
                const imagedownloadURL = await getDownloadURL(snapshot.ref);
                const buffer = Buffer.from(imageData, 'base64');
                console.log("buffer :  " + buffer);
                const base64String = buffer.toString('base64');
                console.log("base:   " + base64String)
                let messageData = {
                    message: imagedownloadURL,
                    from: currentUser.userId,
                    to: selectedUser.userId,
                    timestamp: new Date().getTime(),
                    type: 'image',
                };

                updateMess(messageData);

            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    useEffect(() => {
        setChatList([]);
        const messageUrl = ref(firebaseDatabase, 'messages/' + selectedUser.roomID);
        onValue(messageUrl, snapshot => {
            if (snapshot.exists()) {
                const chatData = Object.values(snapshot.val());
                setChatList(chatData);
            }
        });
    }, [selectedUser.roomID]);
    return (
        <View style={{ flex: 1 }}>
            <Header userName={selectedUser.username} />

            <ImageBackground
                source={require("../../Assets/backgroundAnh.jpg")}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                }}>
                <ScrollView
                    contentContainerStyle={{
                        //    position: 'relative',
                        width: '100%',
                        //height: "100%",
                        bottom: 0,

                    }}>

                    {chatList.length > 0 && chatList
                        ? chatList.map(item => (
                            <CustomMessage
                                key={item.userId}
                                sender={item.from == currentUser.userId}
                                item={item}
                            />
                        ))
                        : null}
                </ScrollView>
            </ImageBackground>

            <View
                style={{
                    width: '100%',
                    backgroundColor: 'green',
                    flexDirection: 'row',
                    height: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TextInput
                    //   multiline
                    style={styles.input}
                    value={message}
                    onChangeText={text => setMessage(text)}
                    onSubmitEditing={message.trim() !== '' ? () => sendingMess() : ''}
                    placeholder="type something"
                />
                <TouchableOpacity
                    style={{
                        marginLeft: 20

                    }}
                    onPress={() => UploadImage()}
                >
                    <Image
                        source={require("../../Assets/GanImage.png")}
                        style={{
                            width: 30,
                            height: 30,

                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        width: '80%',
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
});
export default SingleChat;
