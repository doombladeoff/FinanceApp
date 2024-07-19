import { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";

export const ProfileScreen = () => {
    const [showLetter, setShowLetter] = useState(true);
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                {showLetter ? <Text style={{ fontSize: 40, position: 'absolute', zIndex: 100 }}>J</Text> : null}
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    onLoadEnd={() => setShowLetter(false)}
                    onError={() => setShowLetter(true)}
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'red',
                        borderRadius: 100,
                        zIndex: 1
                    }}/>
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
                    <FontAwesome name="user" size={30} color="black" style={{ paddingLeft: 10 }}/>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16 }}>John Doe</Text>
                        <Text style={{ fontSize: 12 }}>mail@gmail.com</Text>
                    </View>
                </View>

                <Text style={{ fontSize: 22, marginVertical: 10 }}>Settings</Text>

                <View style={[styles.container, { flexDirection: 'column' }]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',
                        }}>
                            <FontAwesome name="user" size={30} color="black"
                                         style={{
                                             paddingVertical: 10,
                                             width: 30,
                                             paddingLeft: 5
                                         }}/>
                            <Text style={{ fontSize: 14, paddingVertical: 10 }}>Edit Username</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="black"/>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Entypo name="email" size={30} color="black"
                                    style={{ paddingVertical: 10, width: 30 }}/>
                            <Text style={{ fontSize: 14, paddingVertical: 10 }}>Change Email</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="black"/>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <MaterialIcons name="password" size={30} color="black"
                                           style={{ paddingVertical: 10, width: 30 }}/>
                            <Text style={{ fontSize: 14, paddingVertical: 10 }}>Reset Password</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="black"/>
                    </TouchableOpacity>

                </View>

                <Text style={{ fontSize: 22, marginVertical: 10 }}>General</Text>

                <View style={[styles.container, { flexDirection: 'column' }]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <MaterialIcons name="feedback" size={30} color="black"
                                           style={{ paddingVertical: 10, width: 30 }}/>
                            <Text style={{ fontSize: 14, paddingVertical: 10 }}>Reset Password</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="black"/>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: 'black', marginVertical: 5 }}/>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Octicons name="info" size={30} color="black"
                                      style={{ paddingVertical: 10, width: 30 }}/>
                            <Text style={{ fontSize: 14, paddingVertical: 10 }}>Reset Password</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={{ marginVertical: 10 }}/>

                <View style={styles.container}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Entypo name="login" size={30} color="black"
                                    style={{ width: 30 }}/>
                            <Text style={{ fontSize: 14, paddingVertical: 10 }}>Logout</Text>
                        </View>
                        <Entypo name="chevron-right" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
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
    }
})