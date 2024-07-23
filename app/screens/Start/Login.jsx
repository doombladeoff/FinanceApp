import { useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { InputWithTitle } from "../../components/InputWithTitle";

import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const fields = [
    { title: 'Email', placeholder: 'example@mail.com' },
    { title: 'Password', placeholder: '********', secureTextEntry: true },
]
export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
        } catch (error) {
            console.log(error);
            alert('Sign in Failed' + error.message)
        } finally {
            setLoading(false);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={{ gap: 10 }}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.loginText}>Log in</Text>
                </View>
                <View style={{ paddingTop: 20 }}>
                    {fields.map(field => <InputWithTitle
                            key={field.title}
                            title={field.title}
                            placeholder={field.placeholder}
                            secureTextEntry={field.secureTextEntry}
                            style={styles.input}
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                    )}

                    <Text style={styles.forgotText}>Forgot password?</Text>

                    {loading ? <ActivityIndicator size={'large'} color={'rgb(26,83,204)'}/> : (
                        <>
                            <TouchableOpacity
                                onPress={signIn}
                                style={styles.loginButton}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Log in</Text>
                            </TouchableOpacity>
                        </>

                    )}


                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <View style={{ width: '45%', height: 2, backgroundColor: 'black' }}/>
                        <Text style={{ fontSize: 14 }}>Or</Text>
                        <View style={{ width: '45%', height: 2, backgroundColor: 'black' }}/>
                    </View>

                    <View style={{ marginVertical: 20, gap: 20 }}>
                        <TouchableOpacity style={styles.anotherLogin}>
                            <AntDesign name="google" size={30} color="black"/>
                            <Text style={{ fontWeight: 'bold' }}>Login with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.anotherLogin}>
                            <FontAwesome5 name="facebook" size={30} color="rgb(26,83,204)"/>
                            <Text style={{ fontWeight: 'bold' }}>Login with Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.haveAccountContainer}>
                        <Text style={{ fontWeight: '300' }}>Don't have an account yet?</Text>
                        <Text style={{ fontWeight: 'bold', color: 'rgb(26,83,204)' }}>Register Now</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'white',
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'rgb(26,83,204)'
    },
    loginText: {
        fontWeight: '400',
        fontSize: 20
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: 20
    },
    forgotText: {
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    loginButton: {
        marginVertical: 40,
        marginHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'rgb(26,83,204)',
        padding: 10,
        borderRadius: 25
    },
    anotherLogin: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    haveAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        top: 50
    }
})