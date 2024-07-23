import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "./Welcome";
import { RegisterScreen } from "./Register";
import { LoginScreen } from "./Login";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomBackButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black"/>
        </TouchableOpacity>
    );
};
export const StartScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen}
                          options={({ navigation }) => ({
                              headerTitle: '',
                              headerShadowVisible: false,
                              headerBackTitleVisible: false,
                              headerLeft: () => <CustomBackButton navigation={navigation}/>,
                          })}
            />
            <Stack.Screen name="Register" component={RegisterScreen}
                          options={({ navigation }) => ({
                              headerTitle: '',
                              headerShadowVisible: false,
                              headerBackTitleVisible: false,
                              headerLeft: () => <CustomBackButton navigation={navigation}/>,
                          })}
            />
        </Stack.Navigator>

    );
}