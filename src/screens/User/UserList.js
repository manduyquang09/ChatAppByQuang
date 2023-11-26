import {
  View,
  Text,
  StatusBar,
  FlatList,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../Constant/Color';
import ListItem from '../../components/ListItem';
import SearchBar from '../../components/SearchBar';
import { get, child, ref, update } from 'firebase/database';
import { firebaseDatabase } from '../../firebase';
import { SimpleToast } from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUserList } from '../../redux/actions/user';
import { v4 as uuidv4 } from 'uuid';
const UserList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const userList = useSelector(state => state.userList.userList);
  const currentUser = useSelector(state => state.user.userData);
  const handleSearch = searchText => {
    console.log(userList);
    const filteredData = userList.filter(user => {
      return user.username.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log('listing: ' + filteredData);
    setData(filteredData);
  };
  const getUserList = () => {
    const userRef = ref(firebaseDatabase, 'users/');
    get(userRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const listing = Object.keys(snapshot.val()).map(userId => {
            const user = snapshot.val()[userId];
            if (currentUser.userId !== userId) {
              return { userId, ...user };
            }
          });

          // setListingUser(listing)
          //  console.log("remove : " + JSON.stringify(listing.filter(user => user)))
          dispatch(setUserList(listing.filter(user => user)));
        }
      })
      .catch(error => { });
  };
  const createChatList = data => {
    const chatListRef = ref(
      firebaseDatabase,
      'chatList/' + currentUser.userId + '/' + data.userId,
    );
    console.log('data: ' + JSON.stringify(chatListRef));
    get(chatListRef).then(snapshot => {
      if (snapshot.exists()) {
        console.log('snap :' + JSON.stringify(snapshot.val()));

        navigation.navigate('singleChat', { selectedUser: snapshot.val() });
      } else {
        const myChatList = {
          userId: currentUser.userId,
          roomID: uuidv4(),
          username: currentUser.username,
          email: currentUser.email,
          lastestMessage: '',
        };
        update(
          ref(
            firebaseDatabase,
            'chatList/' + data.userId + '/' + currentUser.userId,
          ),
          { ...myChatList },
        )
          .then(() => { })
          .catch(error => { });

        //selected user

        delete data['password'];
        data.lastestMessage = '';
        data.roomID = myChatList.roomID;
        update(
          ref(
            firebaseDatabase,
            'chatList/' + currentUser.userId + '/' + data.userId,
          ),
          {
            ...data,
          },
        )
          .then(() => { })
          .catch(error => { });
        console.log('sleected data' + data);
        navigation.navigate('singleChat', { selectedUser: data });
      }
    });
  };
  const renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        onPress={() => {
          createChatList(item);
        }}
      />
    );
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={{ backgroundColor: COLORS.white }}></View>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        data={data.length > 0 ? data : userList}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          borderRadius: 45,
          backgroundColor: '#2e29d5',
          padding: 15,
        }}
        onPress={() => {
          dispatch(removeUser());
        }}>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
          }}>
          Lout out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserList;
