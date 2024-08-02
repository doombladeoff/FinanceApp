import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { AccordionItem } from "../../components/AccordionItem";
import { TransactionItem } from "../../components/TransactionItem";
import { EmptyListTransaction } from "../../components/EmptyListTransaction";
import { useTransactions } from "../../../hooks/useTransictions";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';

const filterTransactionsByPeriod = (transactions, period) => {
    const now = new Date();
    switch (period) {
      case 'today':
        return transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getDate() === now.getDate() &&
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear()
          );
        });
      case 'thisWeek':
      const startOfWeekDate = new Date(now);
      startOfWeekDate.setDate(now.getDate() - now.getDay());
      const endOfWeekDate = new Date(startOfWeekDate);
      endOfWeekDate.setDate(startOfWeekDate.getDate() + 6);
      return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= startOfWeekDate && transactionDate <= endOfWeekDate
        );
      });
      case 'thisMonth':
        return transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear()
          );
        });
      case 'thisYear':
        return transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getFullYear() === now.getFullYear()
          );
        });
      default:
        return transactions;
    }
  };

export const HistoryScreen = () => {
    const { transactions, refreshing, getTransactions } = useTransactions();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('thisWeek');
    const [items, setItems] = useState([
      { label: 'Today', value: 'today' },
      { label: 'This Week', value: 'thisWeek' },
      { label: 'This Month', value: 'thisMonth' },
      { label: 'This Year', value: 'thisYear' }

    ]);

    const [filteredIncomeTransactions, setFilteredIncomeTransactions] = useState([]);
    const [filteredExpenseTransactions, setFilteredExpenseTransactions] = useState([]);

    useEffect(() => {
        const incomeTransactions = transactions.filter(transaction => transaction.type === 'Income');
        const expenseTransactions = transactions.filter(transaction => transaction.type === 'Expense');
        
        setFilteredIncomeTransactions(filterTransactionsByPeriod(incomeTransactions, value));
        setFilteredExpenseTransactions(filterTransactionsByPeriod(expenseTransactions, value));
    }, [value, transactions]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.headerContainer}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>Filter</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    labelStyle={{color: 'skyblue', textAlign:'right'}}
                    containerStyle={{ width: 150, zIndex: 10000}}
                    style={{ borderWidth: 0}}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    placeholder="Select a period"
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
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
                    {filteredIncomeTransactions.length === 0 ? <EmptyListTransaction /> : (
                        filteredIncomeTransactions.map(transaction =>
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        )
                    )}
                </AccordionItem>
                <AccordionItem
                    label={'Expense'}
                    otherStyle={styles.accordionOtherStyle}
                >
                    {filteredExpenseTransactions.length === 0 ? <EmptyListTransaction /> : (
                        filteredExpenseTransactions.map(transaction =>
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        )
                    )}
                </AccordionItem>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    scrollContainer:{
        justifyContent: "space-between",
        gap: 20,
        overflow: 'hidden',
        padding: 20
    },
    accordionOtherStyle: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5
    },
    dropDownContainerStyle:{
        borderWidth: 0, 
        elevation: 2,   
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    }
})