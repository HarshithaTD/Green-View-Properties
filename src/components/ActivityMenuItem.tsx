// src/components/ActivityMenuItem.tsx

import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

interface Props {
  icon: string;
  title: string;
  onPress: () => void;
  badge?: number;
  danger?: boolean;
}

export default function ActivityMenuItem({
  icon,
  title,
  onPress,
  badge,
  danger,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.left}>
        <Feather
          name={icon}
          size={scale(18)}
          color={danger ? 'red' : '#333'}
        />

        <Text
          style={[
            styles.title,
            danger && {color: 'red'},
          ]}>
          {title}
        </Text>
      </View>

      <View style={styles.right}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badge}
            </Text>
          </View>
        )}

        <Feather
          name="chevron-right"
          size={scale(18)}
          color="#999"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(55),

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#F1F1F1',
  },

  left: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  title: {
    marginLeft: scale(14),

    fontSize: fontScale(14),

    color: '#222',

    fontWeight: '500',
  },

  right: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  badge: {
    width: scale(20),

    height: scale(20),

    borderRadius: moderateScale(10),

    backgroundColor: '#FF6B00',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: scale(10),
  },

  badgeText: {
    color: '#fff',

    fontSize: fontScale(10),

    fontWeight: '700',
  },
});