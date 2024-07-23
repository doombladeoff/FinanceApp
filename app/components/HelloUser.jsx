import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, Text } from "react-native";
import { FIREBASE_AUTH } from "../../config/FirebaseConfig";
import { useEffect, useState } from "react";

export const HelloUser = () => {
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        FIREBASE_AUTH?.currentUser?.displayName
            ? setUserName(FIREBASE_AUTH?.currentUser?.displayName)
            : setUserName('User')
    }, []);
    return (
        <>
            <Ionicons
                name="partly-sunny"
                size={24}
                color="black"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    padding: 10,
                    borderRadius: 15,
                    overflow: Platform.OS === 'ios' ? "hidden" : null

                }}
            />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{`Hi 👋` + `\n` + `${userName}`}</Text>
        </>
    )
}