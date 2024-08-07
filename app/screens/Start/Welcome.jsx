import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 50, backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../../../assets/anim/Logo.json')}
                    autoPlay
                    speed={0.8}
                    loop={false}
                    style={{
                        width: 300,
                        height: 300,
                    }}
                />
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Welcome</Text>
                <Text style={{ fontSize: 20, fontWeight: '300' }}>We help you manage your finance.</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgb(26,83,204)',
                        width: 300,
                        padding: 10,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'skyblue',
                        width: 300,
                        padding: 10,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}