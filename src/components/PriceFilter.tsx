import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

interface Props {
  onApplyFilter: (
    min: number,
    max: number,
  ) => void;
}

export default function PriceFilter({
  onApplyFilter,
}: Props) {
  const [minPrice, setMinPrice] =
    useState('');

  const [maxPrice, setMaxPrice] =
    useState('');

  const handleApply = () => {
    const min = Number(minPrice) || 0;

    const max =
      Number(maxPrice) || Infinity;

    onApplyFilter(min, max);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Price Range
      </Text>

      <View style={styles.row}>
        {/* Min Price */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Min"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
            style={styles.input}
            placeholderTextColor="#777"
          />

          <Feather
            name="dollar-sign"
            size={scale(14)}
            color="#777"
          />
        </View>

        {/* Max Price */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Max"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
            style={styles.input}
            placeholderTextColor="#777"
          />

          <Feather
            name="dollar-sign"
            size={scale(14)}
            color="#777"
          />
        </View>

        {/* Apply */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.applyBtn}
          onPress={handleApply}>
          <Text style={styles.applyText}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(22),
  },

  title: {
    fontSize: fontScale(14),

    fontWeight: '700',

    color: '#000',

    marginBottom: verticalScale(12),
  },

  row: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  inputBox: {
    flex: 1,

    height: verticalScale(42),

    backgroundColor: '#F5F5F5',

    borderRadius: moderateScale(10),

    paddingHorizontal: scale(12),

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginRight: scale(10),
  },

  input: {
    flex: 1,

    color: '#000',

    fontSize: fontScale(12),
  },

  applyBtn: {
    backgroundColor: '#0E8F4B',

    paddingHorizontal: scale(18),

    height: verticalScale(42),

    borderRadius: moderateScale(10),

    justifyContent: 'center',

    alignItems: 'center',

    minWidth: scale(80),
  },

  applyText: {
    color: '#fff',

    fontWeight: '700',

    fontSize: fontScale(12),
  },
});