// src/components/PhoneInput.tsx

import React from 'react';

import {
  View,
  Text,
  TextInput,
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
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export default function PhoneInput({
  value,
  onChangeText,
  error,
}: Props) {
  return (
    <View>
      <View style={styles.container}>
        {/* Country */}
        <View style={styles.countryContainer}>
          <Text style={styles.flag}>
            🇮🇳
          </Text>

          <Feather
            name="chevron-down"
            size={scale(16)}
            color="#555"
          />

          <Text style={styles.code}>
            +91
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter mobile number"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={10}
          style={styles.input}
        />
      </View>

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(58),

    borderWidth: 1,

    borderColor: '#E5E5E5',

    borderRadius: moderateScale(14),

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#fff',

    paddingHorizontal: scale(14),
  },

  countryContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  flag: {
    fontSize: fontScale(20),

    marginRight: scale(6),
  },

  code: {
    marginLeft: scale(6),

    fontSize: fontScale(15),

    fontWeight: '600',

    color: '#111',
  },

  divider: {
    width: 1,

    height: verticalScale(28),

    backgroundColor: '#E5E5E5',

    marginHorizontal: scale(14),
  },

  input: {
    flex: 1,

    fontSize: fontScale(15),

    color: '#111',
  },

  errorText: {
    marginTop: verticalScale(8),

    color: 'red',

    fontSize: fontScale(12),
  },
});