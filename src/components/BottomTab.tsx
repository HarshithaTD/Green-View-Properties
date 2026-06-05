// src/components/BottomTab.tsx

import React from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

import {
    scale,
    verticalScale,
    moderateScale,
    fontScale,
} from '../utils/responsive';

export default function BottomTab() {
    const navigation = useNavigation<any>();
    const firstPlot = useSelector(
        (state: RootState) =>
            state.plots.plots[0],
    );

    const openEnquiry = () => {
        if (!firstPlot) {
            Alert.alert(
                'No plots available',
                'Please wait for plots to load.',
            );
            return;
        }

        navigation.navigate('Enquiry', {
            plot: firstPlot,
        });
    };

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
                onPress={openEnquiry}
            />

          {/* <TabItem
    icon="calendar"
    label="Bookings"
    onPress={() => {
        if (!firstPlot) {
            Alert.alert(
                'No plots available',
                'Please wait for plots to load.',
            );
            return;
        }

        navigation.navigate('BookingSummary', {
            bookingId: firstPlot._id,
        });
    }}
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
