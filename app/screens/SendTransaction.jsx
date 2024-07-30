import { useEffect, useState } from "react";
import {
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { uuidv4 } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";
import { sendTransaction } from "../../services/sendTransaction";
import { FIREBASE_AUTH } from "../../config/FirebaseConfig";
import { getBalance } from "../../services/getUserData";
import { sendPayment } from "../../services/sendPayment";

export const SendTransaction = ({ route }) => {
    const navigate = useNavigation();
    const user = FIREBASE_AUTH.currentUser;

    const { balance: bal, paymentType, description: desc } = route.params;
    const [balance, setBalance] = useState(bal);
    const getUserBalance = async () => {
        if (user) {
            try {
                const response = await getBalance(user);
                setBalance(response)
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        if (balance === undefined) {
            getUserBalance();
        }
    }, []);

    const [toUser, setToUser] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState(desc || '');

    const handleSend = async () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        if (amount.trim() === '' || amount.trim() === '0') {
            alert('Please fill in all fields');
            return;
        }
        if (balance > 0 && amount > 0 && amount <= balance) {
            const transactionData = {
                id: uuidv4(),
                amount: Number(amount),
                category: 'Transfer',
                description: description,
                date: formattedDate,
                type: 'Expense',
                fromUser: user.displayName,
                toUser: paymentType ? null : toUser
            };

            if (paymentType)
                await sendPayment(transactionData);
            else
                await sendTransaction(transactionData);
        }
        setAmount(null);
        setDescription(null);

        const type = balance > 0 && amount <= balance ?
            'success' :
            'error';
        navigate.replace('CompleteTransaction', { type });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={{
                        marginVertical: 10
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 34 }}>Payment</Text>
                    </View>
                    <View style={{ alignItems: 'center', gap: 5 }}>
                        <Image
                            source={{ uri: 'https://picsum.photos/200/300' }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                        <Text style={{ textTransform: 'uppercase' }}>Paying</Text>
                        <Text>{user.displayName}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        {paymentType ? null : (
                            <TextInput
                                value={toUser}
                                placeholder={'To User'}
                                onChangeText={(text) => setToUser(text)}
                                style={{ ...styles.input, marginBottom: 20 }}
                            />
                        )}
                        <TextInput
                            value={amount}
                            keyboardType={'numeric'}
                            placeholder={'Amount'}
                            onChangeText={(text) => setAmount(text)}
                            style={styles.input}
                        />
                        <TextInput
                            value={description}
                            placeholder={'Description'}
                            onChangeText={(text) => setDescription(text)}
                            style={{ ...styles.input, marginTop: 20 }}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.button}
                        >
                            <Text style={{ fontWeight: 'bold', padding: 20, fontSize: 16 }}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        gap: 20
    },
    userContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        paddingVertical: 40,
        backgroundColor: 'white'
    },
    input: {
        padding: 10,
        borderRadius: 10,
        width: 300,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    button: {
        backgroundColor: 'skyblue',
        borderRadius: 15,
        marginBottom: 20,
        width: "100%",
        alignItems: 'center',
    }
})