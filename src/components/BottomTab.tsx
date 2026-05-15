// src/components/BottomTab.tsx

import React from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

import {plotsData} from '../data/plotsData';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import {
    scale,
    verticalScale,
    moderateScale,
    fontScale,
} from '../utils/responsive';

export default function BottomTab() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <TabItem
                icon="home"
                label="Home"
                onPress={() =>
                    navigation.navigate('Dashboard')
                }
            />

            <TabItem
                icon="file-text"
                label="Enquiries"
                onPress={() =>
                    navigation.navigate('Enquiry', {
                        plot: plotsData[0],
                    })
                }
            />

            {/* <TabItem
                icon="calendar"
                label="Bookings"
                onPress={() =>
                    navigation.navigate('Booking')
                }
            /> */}

            <TabItem
                icon="user"
                label="Profile"
                onPress={() =>
                    navigation.navigate('Profile')
                }
            />
        </View>
    );
}

interface Props {
    icon: string;
    label: string;
    onPress: () => void;
}

function TabItem({
    icon,
    label,
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.tab}
            onPress={onPress}>
            <Feather
                name={icon}
                size={scale(20)}
                color="#777"
            />

            <Text style={styles.label}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(75),

        backgroundColor: '#fff',

        flexDirection: 'row',

        justifyContent: 'space-around',

        alignItems: 'center',

        borderTopWidth: 1,

        borderTopColor: '#EEEEEE',
    },

    tab: {
        alignItems: 'center',
    },

    label: {
        marginTop: verticalScale(4),

        fontSize: fontScale(11),

        color: '#777',
    },
});