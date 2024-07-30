import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { paymentTypes } from "../../constants/paymentsType";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const renderItem = ({ item }) => {
    return (
        <View
            style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 25
                }}
            >
                {item.icon}
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
            </View>
            <Entypo name='chevron-right' size={24} color="black"/>
        </View>
    )
}

export const Pay = () => {
    const navigation = useNavigation();
    const handleNavigate = (screen, data) => navigation.navigate(screen, data);

    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 20, flex: 1 }}>
            <FlatList
                data={paymentTypes}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => {
                            const { icon, ...itemWithoutIcon } = item;
                            handleNavigate('TransactionStack', { ...item })
                        }}
                    >
                        {renderItem({ item })}
                    </TouchableOpacity>
                }
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flex: 1 }}
            />
        </View>
    );
}