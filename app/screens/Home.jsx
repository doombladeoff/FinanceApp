import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    Platform,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import { HelloUser } from "../components/HelloUser";
import { transactions } from "../transactionData";
import { TransactionItem } from "../components/TransactionItem";

export const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" translucent={true}/>
            <LinearGradient
                colors={['#40b6e8', '#0e6cdd']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, paddingTop: 40 }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <HelloUser/>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Balance</Text>
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                paddingTop: 10,
                                color: 'white'
                            }}>$26,520</Text>
                        </View>
                        <View style={styles.iconsContainer}>
                            <TouchableOpacity>
                                <View style={{ alignItems: "center" }}>
                                    <Ionicons name="send" size={30} color="white" style={styles.icons}/>
                                    <Text style={{ color: "white", paddingTop: 5 }}>Send</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ alignItems: "center" }}>
                                    <Ionicons name="wallet" size={30} color="white" style={styles.icons}/>
                                    <Text style={{ color: "white", paddingTop: 5 }}>Top Up</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ alignItems: "center" }}>
                                    <MaterialCommunityIcons name="cash-multiple" size={30} color="white"
                                                            style={styles.icons}/>
                                    <Text style={{ color: "white", paddingTop: 5 }}>Pay</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={{ alignItems: "center" }}>
                                    <FontAwesome6 name="boxes-stacked" size={30} color="white" style={styles.icons}/>
                                    <Text style={{ color: "white", paddingTop: 5 }}>More</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.transactionContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, top: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Recent Transaction</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "blue" }}>See More</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={transactions.slice(0, 5)}
                            renderItem={({ item }) => <TransactionItem transaction={item}/>}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            keyExtractor={item => item.id}
                        />
                    </View>

                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: "row",
        marginTop: 30,
        gap: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    icons: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 15
    },
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
        backgroundColor: 'rgba(217, 11, 11, 0.3)',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    transactionIcon: {
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        borderRadius: 25
    },
    transactionDetailsContainer: {
        flex: 1,
        justifyContent: "space-between",
        marginLeft: 15,
        flexDirection: "row"
    }
});