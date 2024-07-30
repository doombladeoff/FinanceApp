import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getUserData } from "../../../services/getUserData";
import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { AccordionItem } from "../../components/AccordionItem";
import { TransactionItem } from "../../components/TransactionItem";
import { EmptyListTransaction } from "../../components/EmptyListTransaction";

export const HistoryScreen = () => {
    const user = FIREBASE_AUTH?.currentUser;
    const [transactions, setTransactions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getTransactions = async () => {
        setRefreshing(true);
        try {
            const { transactions } = await getUserData(user);
            setTransactions(transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getTransactions();
    }, [user]);

    const onRefresh = () => {
        getTransactions();
    };

    const IncomeTransactions = transactions.filter(transaction => transaction.type === 'Income');
    const ExpenseTransactions = transactions.filter(transaction => transaction.type === 'Expense');

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 20,
                paddingHorizontal: 20
            }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>Filter</Text>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>This Week</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    justifyContent: "space-between",
                    gap: 20,
                    overflow: 'hidden',
                    padding: 20
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
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
                    <View>
                        {ExpenseTransactions.length === 0 ? <EmptyListTransaction/> : (
                            ExpenseTransactions.map(transaction =>
                                <TransactionItem key={transaction.id} transaction={transaction}/>
                            )
                        )}
                    </View>
                </AccordionItem>
            </ScrollView>
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