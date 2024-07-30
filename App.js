import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabNavigator, TransactionStack, WelcomeStack } from "./app/navigation";

import { RecentTransactions } from "./app/screens/RecentTransactions";
import { StatusBar } from "expo-status-bar";
import { Pay, TransactionScreen } from "./app/screens";

const Stack = createNativeStackNavigator();

const InnerNavigation = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function authUser() {
            onAuthStateChanged(FIREBASE_AUTH, (user) => {
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
        <>
            <StatusBar style="auto"/>
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
                    <Stack.Screen
                        name="TransactionStack"
                        component={TransactionStack}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={'TransactionScreen'}
                        component={TransactionScreen}
                        options={{
                            headerBackTitleVisible: false,
                            headerTitle: 'Transaction Details',
                        }}
                    />
                    <Stack.Screen
                        name="PayScreen"
                        component={Pay}
                        options={{
                            headerTitle: 'Pay',
                            headerBackTitleVisible: false,
                            headerStyle: {
                                backgroundColor: '#1a53cc',

                            },
                            headerTintColor: 'white',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};
