import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getUserData } from "../../../services/getUserData";
import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { AccordionItem } from "../../components/AccordionItem";
import { TransactionItem } from "../../components/TransactionItem";
import { EmptyListTransaction } from "../../components/EmptyListTransaction";

export const HistoryScreen = () => {
    const user = FIREBASE_AUTH?.currentUser;
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactions = async () => {
            const { transactions } = await getUserData(user);
            setTransactions(transactions);
        }
        getTransactions();
    }, []);

    const IncomeTransactions = transactions.filter(transaction => transaction.type === 'Income');
    const ExpenseTransactions = transactions.filter(transaction => transaction.type === 'Expense');

    const handleSelect = (key) => {
        console.log('Selected:', key);
    }
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>Filter</Text>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>This Week</Text>
            </View>
            <View style={{ gap: 20 }}>
                <AccordionItem
                    label={'Income'}
                    otherStyle={styles.accordionOtherStyle}
                >
                    <ScrollView>
                        {IncomeTransactions.length === 0 ? <EmptyListTransaction/> : (
                            IncomeTransactions.map(transaction =>
                                <TransactionItem key={transaction.id} transaction={transaction}/>
                            )
                        )}
                    </ScrollView>
                </AccordionItem>
                <AccordionItem
                    label={'Expense'}
                    otherStyle={styles.accordionOtherStyle}
                >
                    <ScrollView>
                        {ExpenseTransactions.length === 0 ? <EmptyListTransaction/> : (
                            ExpenseTransactions.map(transaction =>
                                <TransactionItem key={transaction.id} transaction={transaction}/>
                            )
                        )}
                    </ScrollView>
                </AccordionItem>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    accordionOtherStyle: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5
    }
})