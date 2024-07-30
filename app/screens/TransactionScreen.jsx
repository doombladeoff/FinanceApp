import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export const TransactionScreen = ({ route }) => {
    const { amount, date, category, from, id, description, type } = route.params.transaction;
    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 20 }}>
                <View style={[styles.blockContainer, {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10
                }]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-{amount}$</Text>
                    <Text style={{ fontSize: 16, fontWeight: 300 }}>{date}</Text>
                </View>
                <View style={[styles.blockContainer]}>
                    <View style={{ paddingHorizontal: 10, gap: 5, }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ fontSize: 20 }}>Status</Text>
                            <Text style={{ fontSize: 16 }}>Success</Text>
                        </View>
                    </View>

                </View>
                <View style={[styles.blockContainer]}>
                    <View style={{ paddingHorizontal: 10, gap: 5, }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}>
                            <Text style={{ fontSize: 20, }}>Balance</Text>
                            <Text style={{ fontSize: 16 }}>2000$</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.blockContainer]}>
                    <View style={{ paddingHorizontal: 10, gap: 15, }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ fontSize: 20, }}>Category</Text>
                            <Text style={{ fontSize: 16 }}>{category}</Text>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 300 }}>From: {from}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 300 }}>Description: {description}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 300 }}>ID: {id}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    blockContainer: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        padding: 10,
    }
})