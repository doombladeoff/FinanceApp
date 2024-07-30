import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native'
import { useState } from "react";

export const CompleteTransaction = ({ route }) => {
    const { type } = route.params
    const navigate = useNavigation();
    const [disabled, setDisabled] = useState(true);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <LottieView
                        onAnimationFinish={() => setDisabled(false)}
                        source={type === 'success' ? require('../../assets/anim/Animation - 1721824042066.json') : require('../../assets/anim/Error.json')}
                        autoPlay
                        speed={2}
                        loop={false}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                    />
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>{type === 'success' ? 'Congratulations' : 'Withdrawal failed!'}</Text>
                    {type === 'error' &&
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>You do not have sufficient funds to complete
                            this transaction, please select a lesser amount.</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        disabled={disabled}
                        style={[styles.button, { opacity: disabled ? 0.7 : 1 }]}
                        onPress={() => navigate.navigate('Home')}
                    >
                        <Text style={{ padding: 15, color: 'white', fontSize: 18 }}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    content: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        width: '80%'
    },
    button: {
        backgroundColor: 'rgb(26,83,204)',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    }
})