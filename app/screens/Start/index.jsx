import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "./Welcome";
import { RegisterScreen } from "./Register";
import { LoginScreen } from "./Login";
import { CustomBackButton } from "../../components/Header/CustomBackButton";

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