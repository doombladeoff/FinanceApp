import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CustomBackButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black"/>
        </TouchableOpacity>
    );
};