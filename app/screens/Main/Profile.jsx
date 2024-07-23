import { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { updateProfile } from "firebase/auth";
import Accordion from "../../components/Accordion";

export const ProfileScreen = message => {
    const [showLetter, setShowLetter] = useState(true);

    const { displayName, email, photoURL } = FIREBASE_AUTH?.currentUser;
    const [displayNameInput, setDisplayNameInput] = useState(displayName);
    const [emailInput, setEmailInput] = useState(email);
    const [passwordInput, setPasswordInput] = useState('');

// TODO: add password change
// TODO: add email change
// TODO: add photo change

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    {showLetter ? <Text style={{ fontSize: 40, position: 'absolute', zIndex: 100 }}>J</Text> : null}
                    <Image
                        source={{ uri: 'https://via.placeholde111r.com/100' }}
                        onLoadEnd={() => setShowLetter(false)}
                        onError={() => setShowLetter(true)}
                        style={styles.image}/>
                </View>

                <View style={{ marginTop: 20, width: '80%' }}>
                    <View style={[
                        styles.container,
                        {
                            flexDirection: 'row',
                            gap: 20,
                            alignItems: 'center',
                        }
                    ]}>
                        <FontAwesome name="user" size={30} color="black" style={{ paddingLeft: 5 }}/>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 16 }}>{displayName}</Text>
                            <Text style={{ fontSize: 12 }}>{email}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, marginVertical: 10 }}>Settings</Text>

                    <View style={[styles.container, { flexDirection: 'column' }]}>
                        <Accordion
                            title={'Edit Username'}
                            IconType={FontAwesome}
                            iconName={'user'}
                        >
                            <TextInput
                                value={displayNameInput}
                                style={styles.input}
                                onChangeText={(text) => setDisplayNameInput(text)}
                            />
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => updateProfile(FIREBASE_AUTH?.currentUser, { displayName: displayNameInput })}
                            >
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </Accordion>
                        <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>
                        <Accordion
                            title={'Change Email'}
                            IconType={Entypo}
                            iconName={'email'}
                        >
                            <TextInput
                                value={emailInput}
                                style={styles.input}
                                onChangeText={(text) => setEmailInput(text)}
                            />
                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </Accordion>
                        <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>

                        <Accordion
                            title={'Reset Password'}
                            IconType={MaterialIcons}
                            iconName={'password'}
                        >
                            <TextInput
                                value={passwordInput}
                                style={styles.input}
                                onChangeText={(text) => setPasswordInput(text)}
                            />
                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </Accordion>
                    </View>

                    <Text style={{ fontSize: 20, marginVertical: 10 }}>General</Text>

                    <View style={[styles.container, { flexDirection: 'column' }]}>

                        <Accordion
                            title={'Feedback'}
                            IconType={MaterialIcons}
                            iconName={'feedback'}
                        >
                            <Text>Edit Username</Text>
                        </Accordion>
                        <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>

                        <Accordion
                            title={'About Application'}
                            IconType={Octicons}
                            iconName={'info'}
                        >
                            <Text>Edit Username</Text>
                        </Accordion>
                    </View>

                    <View style={{ marginVertical: 10 }}/>

                    <View style={styles.container}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                            onPress={() => FIREBASE_AUTH.signOut()}
                        >
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Entypo name="login" size={30} color="black" style={{ width: 30 }}/>
                                <Text style={{ fontSize: 14, paddingVertical: 10 }}>Logout</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 100,
        zIndex: 1
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 5
    },
    saveButton: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        width: '50%',
        alignSelf: 'center',
    },
    saveText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})