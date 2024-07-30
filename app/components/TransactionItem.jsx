import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { format } from 'date-fns';
import { useNavigation } from "@react-navigation/native";

export const TransactionItem = ({ transaction }) => {
    const navigate = useNavigation();
    const { type, description: title, amount, category, date } = transaction;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'd MMMM');
    };

    const handleNavigate = (screen, data) => navigate.navigate(screen, data);
    return (
        <TouchableOpacity onPress={() => handleNavigate("TransactionScreen", { transaction })}>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                <View
                    style={[styles.transactionIconContainer, { backgroundColor: type === "Income" ? "rgba(18, 181, 59, 0.15)" : 'rgba(217, 11, 100, 0.15)' }]}>
                    <View
                        style={[styles.transactionIcon, { backgroundColor: type === "Income" ? 'rgb(16,213,64)' : 'red' }]}>
                        <FontAwesome6 name="dollar-sign" size={24} color="white"/>
                    </View>
                </View>

                <View style={styles.transactionDetailsContainer}>
                    <View>
                        <Text style={{ fontWeight: "bold", textAlign: 'left' }}>{title}</Text>
                        <Text style={{ fontWeight: "300" }}>{formatDate(date)}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: type === "Income" ? "green" : "red",
                                textAlign: "right"
                            }}>{type === "Income" ? "+" : "-"}${amount}</Text>
                        <Text style={{ fontWeight: "300" }}>{category}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    transactionContainer: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    transactionIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    transactionIcon: {
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    transactionDetailsContainer: {
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 15,
        flexDirection: "row"
    }
})