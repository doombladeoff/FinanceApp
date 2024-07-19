import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export const StatisticCard = ({ title, value }) => {
    const colors = title === "Income" ? ['#6f86d6', '#6f86d6'] : ['#ef476f', '#ef476f'];
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 15, padding: 10 }}
        >
            <View style={styles.card}>
                <Feather
                    name={title === "Income" ? "arrow-down-left" : "arrow-up-right"}
                    size={20}
                    color="white"
                    style={{
                        marginVertical: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        padding: 5,
                        borderRadius: 10
                    }}
                />

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>${value}</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 100,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    value: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    }
})