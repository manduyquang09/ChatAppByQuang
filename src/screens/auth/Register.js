import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../../Constant/Color';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuid';
import 'react-native-get-random-values';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseDatabase, auth, createUserWithEmailAndPassword } from '../../firebase';
import SimpleToast from 'react-native-simple-toast';
const { width, height } = Dimensions.get('window')
const Register = ({ navigation }) => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const validate = () => {
        if (userName === '' || password.length < 6 || email === '') {
            SimpleToast.show('Please fill in correctly')
            return false
        }
        return true

    }
    const createUser = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                set(ref(firebaseDatabase, 'users/' + userId), {
                    username: userName,
                    email: email,
                    password: password
                })
                    .then(() => {
                        SimpleToast.show('Account created successfully')
                        navigation.navigate("Login")
                    })
                    .catch((error) => {
                        SimpleToast.show(error)
                    });
            })
            .catch((error) => {
                SimpleToast.show(error.message);
            });


    }
    return (
        <View
            style={{ flex: 1 }}
        >
            <View
                style={styles.Header}
            >
                <Image
                    style={{ width: 85, height: 85, borderRadius: 35 }}
                    source={require("../../Assets/Icon.jpg")}
                />
                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: "#fff",
                        fontFamily: "Roboto-mediumItalic",
                    }}
                >QUANG DEVELOPER</Text>
            </View>
            <View
                style={{
                    flex: 1, alignItems: 'center',
                    marginTop: 45,
                }}
            >
                <View
                    style={styles.CardContainer}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            fontFamily: "Roboto-mediumItalic",
                            color: "#20315f"
                        }}
                    >Register</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Roboto-Regular',
                            fontSize: 15,
                            marginVertical: 20,
                        }}
                    >Enter your name,Email and password for sign up,

                    </Text>
                    <InputField
                        label={"userName"}
                        value={userName}
                        onChangeValue={setUserName}
                    />
                    <InputField
                        label={"email"}
                        value={email}
                        onChangeValue={setEmail}
                    />
                    <InputField
                        label={"password"}
                        value={password}
                        onChangeValue={setPassword}
                    />
                    <CustomButton
                        label={"Register"}
                        onPress={() => { validate() ? createUser() : null }}
                    />
                    <View style={styles.ExistingUserContainer}>
                        <Text style={{
                            fontSize: 14,
                            color: COLORS.black,
                            textAlign: 'center',
                        }}>Existing user?</Text>
                        <TouchableOpacity
                            style={{
                                marginLeft: 4,

                            }}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text
                                style={{
                                    color: COLORS.theme,
                                    textDecorationLine: 'underline',
                                    fontSize: 14,
                                    fontFamily: "Roboto-Bold",

                                }}
                            >Login Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    Header: {
        backgroundColor: COLORS.theme,
        height: height / 4,
        borderBottomLeftRadius: 100
        ,
        justifyContent: 'center',
        alignItems: 'center'

    },
    CardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "95%"
        ,
        padding: 20,
        shadowColor: "#000",
        borderRadius: 10,
        shadowRadius: 4,
        elevation: 4

    },
    ExistingUserContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});

export default Register;
