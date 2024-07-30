import { useAccordion } from "../../hooks/useAccordion";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { runOnUI, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";

export const AccordionItem = ({ label, children, otherStyle, iconName, IconType }) => {
    const { setHeight, animatedHeightStyle, animatedRef, isOpened } = useAccordion();
    const animatedChevron = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: withTiming(`${isOpened.value ? 90 : 0}deg`, { duration: 300 })
            }
        ]
    }))
    return (
        <View style={[otherStyle]}>
            <Pressable onPress={() => runOnUI(setHeight)()}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {label === "Income" || label === "Expense" ? (
                            <View
                                style={[styles.iconHeader, { backgroundColor: label === "Income" ? 'rgb(16,213,64)' : 'red' }]}>
                                <FontAwesome6 name={'dollar-sign'} size={24} color="white"/>
                            </View>
                        ) : null}

                        {IconType && <IconType name={iconName} size={30} color="black"
                                               style={[styles.icon, { paddingLeft: iconName === 'user' ? 5 : 0 }]}/>}

                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{`${label}`}</Text>
                    </View>
                    <Animated.View style={[animatedChevron]}>
                        <Entypo name={'chevron-right'} size={24} color={'black'}/>
                    </Animated.View>
                </View>
            </Pressable>
            <Animated.View style={[animatedHeightStyle, { overflow: 'hidden' }]}>
                <View style={styles.itemContainer}>
                    <View ref={animatedRef} collapsable={false}>
                        <View style={[styles.body]}>
                            {children}
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconHeader: {
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    itemContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    body: {
        // alignSelf: 'stretch',
        //width: Dimensions.get('window').width,
    },
    icon: {
        paddingVertical: 10,
        width: 30,
    }
})