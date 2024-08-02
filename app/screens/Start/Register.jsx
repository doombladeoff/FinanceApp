import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../config/FirebaseConfig";
import { useForm } from "react-hook-form";
import { InputController } from "../../components/InputController";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { fields } from "../../../constants/inputFields";
import { useNavigation } from "@react-navigation/native";

export const RegisterScreen = () => {
    const navigation = useNavigation();
    const form = useForm({
            defaultValues: {
                email: '',
                password: '',
                confirmPassword: '',
                userName: '',
            },
        }),
        {
            control,
            handleSubmit,
            formState: { errors }
        } = form

    const onError = (data) => {
        console.error(JSON.stringify(data, null, 2));
    }

    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const onSubmit = async (data) => {
        const { email, password, confirmPassword, userName } = data;
        console.log(data)
        try {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            setLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response.user, { displayName: userName });
            const userRef = doc(FIRESTORE_DB, 'users', response.user.uid);
            await setDoc(userRef, {
                email: email,
                displayName: userName,
                balance: 0,
            });
            //console.log(response)
        } catch (error) {
            //console.log(error);
            if (error.code === 'auth/email-already-in-use') Alert.alert('Error', 'Email already in use')
            else
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
                    {fields.map(field => (
                        <View key={field.key}>
                            <InputController
                                name={field.name}
                                requiredMessage={'This field is required'}
                                control={control}
                                pattern={{
                                    value: field.pattern,
                                    message: field.errorMessage
                                }}
                                title={field.title}
                                placeholder={field.placeholder}
                                secureTextEntry={field.secureTextEntry}
                                style={styles.input}
                            />
                            {errors[field.name] &&
                                <Text style={{ color: 'red', paddingBottom: 10 }}>{errors[field.name].message}</Text>}
                        </View>
                    ))}

                    {loading ? <ActivityIndicator size={'large'} color={'rgb(26,83,204)'}/> : (
                        <TouchableOpacity
                            onPress={handleSubmit((data) => onSubmit(data), onError)}
                            style={styles.loginButton}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Register</Text>
                        </TouchableOpacity>
                    )}


                    <View style={styles.haveAccountContainer}>
                        <Text style={{ fontWeight: '300' }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.replace('Login')}>
                            <Text style={{ fontWeight: 'bold', color: 'rgb(26,83,204)' }}>Login Now</Text>
                        </TouchableOpacity>
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