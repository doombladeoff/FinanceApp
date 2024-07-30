import { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { updateProfile } from "firebase/auth";
import { AccordionItem } from "../../components/AccordionItem";

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
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    {showLetter ? <Text style={{ fontSize: 40, position: 'absolute', zIndex: 100 }}>J</Text> : null}
                    <Image
                        source={{ uri: 'https://via.placeholde111r.com/100' }}
                        onLoadEnd={() => setShowLetter(false)}
                        onError={() => setShowLetter(true)}
                        style={styles.image}
                    />
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
                        <AccordionItem
                            label={'Edit Display Name'}
                            otherStyle={{ justifyContent: 'center' }}
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
                        </AccordionItem>

                        <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>

                        <AccordionItem
                            label={'Change Email'}
                            IconType={Entypo}
                            iconName={'email'}
                            otherStyle={{ justifyContent: 'center' }}
                        >
                            <TextInput
                                value={emailInput}
                                style={styles.input}
                                onChangeText={(text) => setEmailInput(text)}
                            />
                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </AccordionItem>

                        <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>

                        <AccordionItem
                            label={'Reset Password'}
                            IconType={MaterialIcons}
                            iconName={'password'}
                            otherStyle={{ justifyContent: 'center' }}
                        >
                            <TextInput
                                value={passwordInput}
                                style={styles.input}
                                onChangeText={(text) => setPasswordInput(text)}
                            />
                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </AccordionItem>
                    </View>

                    <Text style={{ fontSize: 20, marginVertical: 10 }}>General</Text>

                    <View style={[styles.container, { flexDirection: 'column' }]}>
                        <AccordionItem
                            label={'Feedback'}
                            IconType={MaterialIcons}
                            iconName={'feedback'}
                        >
                            <Text>//////////</Text>
                        </AccordionItem>

                        <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>

                        <AccordionItem
                            label={'About Application'}
                            IconType={Octicons}
                            iconName={'info'}
                        >
                            <Text>////////</Text>
                        </AccordionItem>
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
        padding: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        backgroundColor: 'skyblue',
        alignSelf: 'center',
    },
    saveText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})