import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

export default function Header() {
  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconButton}>
        <Feather
          name="menu"
          size={scale(24)}
          color="#000"
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        Dashboard
      </Text>

      {/* Notification */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconButton}>
        <Feather
          name="bell"
          size={scale(22)}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),

    paddingVertical: verticalScale(18),

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    backgroundColor: '#fff',
  },

  iconButton: {
    width: scale(42),

    height: scale(42),

    borderRadius: moderateScale(12),

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#F7F7F7',

    shadowColor: '#000',

    shadowOpacity: 0.03,

    shadowRadius: moderateScale(4),

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  title: {
    fontSize: fontScale(18),

    fontWeight: '700',

    color: '#000',

    letterSpacing: 0.3,
  },
});