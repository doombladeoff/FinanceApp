import { View, Text } from "react-native";
import { StatisticCard } from "../components/StatisticCard";
import { transactions } from "../transactionData";

export const StatisticScreen = () => {

    const income = transactions.filter(transaction => transaction.type === "Income").reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions.filter(transaction => transaction.type === "Expense").reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 18 }}>Overview</Text>
                    <Text style={{ fontSize: 18 }}>Yearly</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                    <StatisticCard title='Income' value={income}/>
                    <StatisticCard title='Expense' value={expense}/>
                </View>
            </View>
        </View>
    );
}