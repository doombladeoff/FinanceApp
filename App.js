import Ionicons from '@expo/vector-icons/Ionicons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen, StatisticScreen, HistoryScreen, ProfileScreen } from "./app/screens";
import { FontAwesome, Fontisto, Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerTitleAlign: "center",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0,
                            height: 25,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                        elevation: 15,
                    }
                }}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Octicons name="home" size={size} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Statistic"
                    component={StatisticScreen}
                    options={{
                        headerStyle: {
                            shadowColor: 'white',
                        },
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="stats-chart" size={size} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Fontisto name="history" size={size} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerStyle: {
                            shadowColor: 'white',
                        },
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user-circle" size={size} color={color}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
