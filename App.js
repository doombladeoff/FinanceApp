import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabNavigator, WelcomeStack } from "./app/navigation";

import { Provider } from "react-redux";
import store from "./store";
import { RecentTransactions } from "./app/screens/RecentTransactions";

const Stack = createNativeStackNavigator();

const InnerNavigation = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function authUser() {
            onAuthStateChanged(FIREBASE_AUTH, (user) => {
                //console.log('USER:', user);
                setUser(user);
            });
        }

        authUser();
    }, []);
    return (
        <Stack.Navigator>
            {user ? (
                <Stack.Screen
                    name="TabNavigator"
                    component={TabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
            ) : (
                <Stack.Screen
                    name="WelcomeStack"
                    component={WelcomeStack}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_left'
                    }}
                />
            )}
        </Stack.Navigator>
    )
}
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={'FirstScreen'}
                        component={InnerNavigation}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={'RecentTransactions'}
                        component={RecentTransactions}
                        options={{
                            headerBackTitle: 'Transaction',
                            headerBackTitleStyle: {
                                color: 'white',
                            },
                            headerTitle: '',
                            headerStyle: {
                                backgroundColor: '#1a53cc',
                            },
                            headerTintColor: 'white',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
};
