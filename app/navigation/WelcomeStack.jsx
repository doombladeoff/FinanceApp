import { StartScreen } from "../screens/Start";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const WelcomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
            <Stack.Screen
                name='StartScreen'
                component={StartScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}