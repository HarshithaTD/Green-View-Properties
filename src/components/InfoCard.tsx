import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

interface Props {
  title: string;
  value: string;
}

const InfoCard = ({title, value}: Props) => {
  return (
    <View style={styles.card}>
      <Text
        numberOfLines={1}
        style={styles.title}>
        {title}
      </Text>

      <Text
        numberOfLines={1}
        style={styles.value}>
        {value}
      </Text>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    width: '31%',

    backgroundColor: '#fff',

    borderWidth: 1,

    borderColor: '#EEEEEE',

    borderRadius: moderateScale(12),

    paddingVertical: verticalScale(16),

    paddingHorizontal: scale(8),

    alignItems: 'center',

    justifyContent: 'center',

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
    fontSize: fontScale(11),

    color: '#777',

    marginBottom: verticalScale(6),

    textAlign: 'center',
  },

  value: {
    fontSize: fontScale(13),

    fontWeight: '700',

    color: '#000',

    textAlign: 'center',
  },
});