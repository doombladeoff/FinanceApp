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
import { InputWithTitle } from "../../components/InputWithTitle";

import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const fields = [
    { title: 'Username', placeholder: 'John Doe' },
    { title: 'Email', placeholder: 'example@mail.com' },
    { title: 'Password', placeholder: '********', secureTextEntry: true, value: '********' },
    { title: 'Confirm Password', placeholder: '********', secureTextEntry: true, value: '********' },
]
export const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const signUp = async () => {
        try {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            setLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response.user, { displayName: username });
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
                    <Text style={styles.registerText}>Register</Text>
                </View>

                <View style={{ paddingTop: 20 }}>
                    {fields.map(field => <InputWithTitle
                            key={field.title}
                            title={field.title}
                            placeholder={field.placeholder}
                            secureTextEntry={field.secureTextEntry}
                            value={field.value}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            setUsername={setUsername}
                            setConfirmPassword={setConfirmPassword}
                            style={styles.input}
                        />
                    )}

                    {loading ? <ActivityIndicator size={'large'} color={'rgb(26,83,204)'}/> : (
                        <TouchableOpacity
                            onPress={signUp}
                            style={styles.loginButton}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Register</Text>
                        </TouchableOpacity>
                    )}


                    <View style={styles.haveAccountContainer}>
                        <Text style={{ fontWeight: '300' }}>Already have an account?</Text>
                        <Text style={{ fontWeight: 'bold', color: 'rgb(26,83,204)' }}>Login Now</Text>
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
    registerText: {
        fontWeight: '400',
        fontSize: 20
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: 20,
        fontSize: 14
    },
    loginButton: {
        marginVertical: 40,
        alignItems: 'center',
        backgroundColor: 'rgb(26,83,204)',
        padding: 10,
        borderRadius: 25
    },
    haveAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        top: 50
    }
})