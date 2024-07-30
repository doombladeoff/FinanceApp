import { useRoute } from "@react-navigation/native";
import { SendTransaction } from "../screens/SendTransaction";
import { CustomBackButton } from "../components/Header/CustomBackButton";
import { CompleteTransaction } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export const TransactionStack = () => {
    const route = useRoute();
    const { balance, type, description, name: paymentType } = route.params || {};
    //console.log(route.params)

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SendTransaction"
                component={SendTransaction}
                options={({ navigation }) => ({
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerLeft: () => <CustomBackButton navigation={navigation}/>,
                })}
                initialParams={{ balance, description, paymentType }}

            />
            <Stack.Screen
                name="CompleteTransaction"
                component={CompleteTransaction}
                options={{ headerShown: false }}
                initialParams={{ type }}
            />
        </Stack.Navigator>
    );
}