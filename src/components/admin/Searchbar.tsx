import React from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';

interface SearchBarProps {
  value: string;
  onChangeText: (
    text: string,
  ) => void;
  onFilterPress?: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  onFilterPress,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      {/* SEARCH BOX */}
      <View style={styles.searchBox}>
        <Icon
          name="search-outline"
          size={moderateScale(20)}
          color="#777"
        />

        <TextInput
          placeholder="Search plots, location..."
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
      </View>

      {/* FILTER BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.filterBtn}
        onPress={onFilterPress}>
        <Icon
          name="options-outline"
          size={moderateScale(20)}
          color="#111"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const BOX_HEIGHT =
  verticalScale(54);

const FILTER_SIZE =
  scale(54);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop:
      verticalScale(20),
  },

  searchBox: {
    flex: 1,

    height: BOX_HEIGHT,

    backgroundColor:
      '#F3F4F6',

    borderRadius:
      moderateScale(16),

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal:
      scale(14),

    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  input: {
    flex: 1,

    marginLeft:
      scale(10),

    color: '#111',

    fontSize:
      fontScale(14),

    paddingVertical: 0,
  },

  filterBtn: {
    width: FILTER_SIZE,
    height: FILTER_SIZE,

    marginLeft:
      scale(12),

    borderRadius:
      moderateScale(16),

    backgroundColor:
      '#F3F4F6',

    justifyContent:
      'center',

    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#ECECEC',
  },
});