import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { AccordionItem } from "../../components/AccordionItem";
import { TransactionItem } from "../../components/TransactionItem";
import { EmptyListTransaction } from "../../components/EmptyListTransaction";
import { useTransactions } from "../../../hooks/useTransictions";

export const HistoryScreen = () => {
    const { transactions, refreshing, getTransactions } = useTransactions();

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
                        onRefresh={getTransactions}
                    />
                }
            >
                <AccordionItem
                    label={'Income'}
                    otherStyle={styles.accordionOtherStyle}
                >
                    {IncomeTransactions.length === 0 ? <EmptyListTransaction /> : (
                        IncomeTransactions.map(transaction =>
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        )
                    )}
                </AccordionItem>
                <AccordionItem
                    label={'Expense'}
                    otherStyle={styles.accordionOtherStyle}
                >
                    {ExpenseTransactions.length === 0 ? <EmptyListTransaction /> : (
                        ExpenseTransactions.map(transaction =>
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        )
                    )}
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