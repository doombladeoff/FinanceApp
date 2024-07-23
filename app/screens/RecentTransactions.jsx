import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { TransactionItem } from "../components/TransactionItem";
import { Entypo } from "@expo/vector-icons";

export const RecentTransactions = ({ route }) => {
    const [filter, setFilter] = useState('new');
    const data = route.params;

    const sortedData = filter === 'new' ?
        [...data].sort((a, b) => new Date(b.date) - new Date(a.date)) :
        [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Filter</Text>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                    onPress={() => setFilter(filter === 'new' ? 'old' : 'new')}
                >
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: 'skyblue'
                    }}>{filter === 'new' ? "New" : "Old"}</Text>
                    <Entypo name={filter === 'new' ? "chevron-down" : "chevron-up"} size={24} color="skyblue"/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={sortedData}
                renderItem={({ item }) => <TransactionItem transaction={item}/>}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}