import React from 'react';

import {
  View,
  TextInput,
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

interface Props {
  searchText?: string;

  value?: string;

  onSearch?: (
    text: string,
  ) => void;

  onChangeText?: (
    text: string,
  ) => void;

  onFilterPress?: () => void;

  placeholder?: string;
}

export default function SearchBar({
  searchText,
  value,
  onSearch,
  onChangeText,
  onFilterPress,
  placeholder =
    'Search location, plot number...',
}: Props) {
  return (
    <View style={styles.container}>
      {/* SEARCH BOX */}
      <View style={styles.searchBox}>
        <Feather
          name="search"
          size={scale(18)}
          color="#999"
        />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#999"
          style={styles.input}
          value={searchText || value}
          onChangeText={
            onSearch || onChangeText
          }
        />
      </View>

      {/* FILTER BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.filterBtn}
        onPress={onFilterPress}>
        <Feather
          name="sliders"
          size={scale(18)}
          color="#333"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(18),

    flexDirection: 'row',

    alignItems: 'center',
  },

  searchBox: {
    flex: 1,

    height: verticalScale(48),

    backgroundColor: '#e0ebe0',

    borderRadius:
      moderateScale(10),

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal:
      scale(14),
  },

  input: {
    flex: 1,

    marginLeft: scale(10),

    color: '#000',

    fontSize: fontScale(14),

    paddingVertical: 0,
  },

  filterBtn: {
    width: scale(48),

    height: verticalScale(48),

    marginLeft: scale(10),

    borderRadius:
      moderateScale(10),

    backgroundColor: '#e3eee5',

    justifyContent: 'center',

    alignItems: 'center',
  },
});