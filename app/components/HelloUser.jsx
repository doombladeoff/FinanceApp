import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";

export const HelloUser = () => {
    return (
        <>
            <Ionicons
                name="partly-sunny"
                size={24}
                color="black"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: 10, borderRadius: 25 }}
            />
            <Text>{`Hello` + `\n` + `Dmitriy`}</Text>
        </>
    )
}