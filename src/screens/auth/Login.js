import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../Constant/Color';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuid';
import 'react-native-get-random-values';
import SimpleToast from 'react-native-simple-toast';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {
  firebaseDatabase,
  auth,
  signInWithEmailAndPassword,
} from '../../firebase';
import { onValue, ref } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/user';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [Id, setUserId] = useState('');
  const dispatch = useDispatch();
  const validate = () => {
    if (email === '' || password === '') {
      SimpleToast.show('Please fill in correctly');
      return false;
    }
    return true;
  };
  useEffect(() => {
    signIn();
  }, []);
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userId = userCredential.user.uid;
        const userRef = ref(firebaseDatabase, 'users/' + userId);
        onValue(userRef, snapshot => {
          const user = { userId, ...snapshot.val() };
          dispatch(setUser(user));
        });
      })
      .catch(error => {
        SimpleToast.show(error.message);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.Header}>
        <Image
          style={{ width: 85, height: 85, borderRadius: 35 }}
          source={require('../../Assets/Icon.jpg')}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Roboto-mediumItalic',
          }}>
          QUANG DEVELOPER
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 90,
        }}>
        <View style={styles.CardContainer}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'Roboto-mediumItalic',
              color: '#20315f',
            }}>
            Login
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Roboto-Regular',
              fontSize: 15,
              marginVertical: 20,
            }}>
            Enter your name,Email and password for sign in
          </Text>
          <InputField label={'email'} value={email} onChangeValue={setEmail} />
          <InputField
            label={'password'}
            value={password}
            onChangeValue={setPassword}
          />
          <CustomButton
            label={'Login'}
            onPress={() => {
              validate() ? signIn() : null;
            }}
          />
          <View style={styles.ExistingUserContainer}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black,
                textAlign: 'center',
              }}>
              Register a new account
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 4,
              }}
              onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  color: COLORS.theme,
                  textDecorationLine: 'underline',
                  fontSize: 14,
                  fontFamily: 'Roboto-Bold',
                }}>
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Header: {
    backgroundColor: COLORS.theme,
    height: height / 4,
    borderBottomLeftRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    padding: 20,
    shadowColor: '#000',
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 4,
  },
  ExistingUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Login;
