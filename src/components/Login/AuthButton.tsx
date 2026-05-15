// src/components/AuthButton.tsx

import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import {
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';

interface Props {
  title: string;
  onPress?: () => void;
}

export default function AuthButton({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.button}
      onPress={onPress}>
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: verticalScale(54),

    backgroundColor: '#2E7D32',

    borderRadius: moderateScale(18),

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: verticalScale(6),

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  text: {
    color: '#fff',

    fontSize: fontScale(18),

    fontWeight: '700',
  },
});