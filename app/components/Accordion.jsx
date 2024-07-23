import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from "@expo/vector-icons";

const Accordion = ({ title, children, IconType, iconName }) => {
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleAccordion = () => {
        const initialValue = expanded ? 1 : 0;
        const finalValue = expanded ? 0 : 1;

        setExpanded(!expanded);
        Animated.timing(animation, {
            toValue: finalValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // Здесь 200 - это высота развёрнутого контента
    });

    const rotateChevron = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    return (
        <>
            <TouchableOpacity
                onPress={toggleAccordion}
                style={styles.pressContainer}
            >
                <View style={styles.pressContainerHeader}>
                    {IconType && <IconType
                        name={iconName}
                        size={30}
                        color="black"
                        style={
                            [
                                styles.icon,
                                {
                                    paddingLeft: iconName === 'user' ? 5 : 0
                                }
                            ]
                        }
                    />
                    }

                    <Text style={styles.title}>{title}</Text>
                </View>
                <Animated.View style={{ transform: [{ rotate: rotateChevron }] }}>
                    <Entypo name="chevron-right" size={24} color="black"/>
                </Animated.View>
            </TouchableOpacity>
            <Animated.View style={[styles.content, { height }]}>
                {expanded && children}
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    pressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pressContainerHeader: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        marginVertical: 10,
    },
    content: {
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    icon: {
        paddingVertical: 10,
        width: 30,
    },
});

export default Accordion;
