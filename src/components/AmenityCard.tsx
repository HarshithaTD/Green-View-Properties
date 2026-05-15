import React from 'react';
import {
  View,
  Text,
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
  item: {
    title: string;
    distance: string;
    icon: string;
  };
}

const AmenityCard = ({item}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Feather
          name={item.icon}
          size={scale(20)}
          color="#222"
        />
      </View>

      <Text
        numberOfLines={1}
        style={styles.title}>
        {item.title}
      </Text>

      <Text
        numberOfLines={1}
        style={styles.distance}>
        {item.distance}
      </Text>
    </View>
  );
};

export default AmenityCard;

const styles = StyleSheet.create({
  card: {
    width: scale(75),
    minHeight: verticalScale(100),
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: moderateScale(14),
    justifyContent: 'center',

    alignItems: 'center',
    marginRight: scale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(6),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: moderateScale(4),

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  iconContainer: {
    width: scale(42),
    height: scale(42),
    borderRadius: moderateScale(21),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: verticalScale(10),
    fontSize: fontScale(12),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },

  distance: {
    marginTop: verticalScale(4),

    fontSize: fontScale(11),

    color: '#666',

    textAlign: 'center',
  },
});