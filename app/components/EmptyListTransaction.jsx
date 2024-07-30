import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export const EmptyListTransaction = () => {
    return (
        <View style={styles.EmptyListContainer}>
            <Entypo name="emoji-sad" size={48} color="black"/>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>No transactions
                yet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    EmptyListContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 10
    }
})