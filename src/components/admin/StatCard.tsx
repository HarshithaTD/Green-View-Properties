import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';

interface StatCardProps {
  item: {
    title: string;
    value: string | number;
    subtitle: string;
    color: string;
    iconColor: string;
    icon: any;
  };
}

const StatCard = ({
  item,
}: StatCardProps) => {
  return (
    <View style={styles.card}>
      {/* ICON */}
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              item.color,
          },
        ]}>
        <Icon
          name={item.icon}
          size={moderateScale(22)}
          color={
            item.iconColor
          }
        />
      </View>

      {/* TITLE */}
      <Text
        numberOfLines={1}
        style={styles.title}>
        {item.title}
      </Text>

      {/* VALUE */}
      <Text style={styles.value}>
        {item.value}
      </Text>

      {/* SUBTITLE */}
      <Text
        numberOfLines={1}
        style={
          styles.subtitle
        }>
        {item.subtitle}
      </Text>
    </View>
  );
};

export default StatCard;

const CARD_RADIUS =
  moderateScale(18);

const ICON_SIZE =
  scale(46);

const styles = StyleSheet.create({
  card: {
    width: '48%',

    backgroundColor:
      '#FFFFFF',

    borderRadius:
      CARD_RADIUS,

    padding:
      moderateScale(16),

    marginBottom:
      verticalScale(15),

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 4,
  },

  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,

    borderRadius:
      ICON_SIZE / 2,

    justifyContent:
      'center',

    alignItems: 'center',

    marginBottom:
      verticalScale(12),
  },

  title: {
    color: '#555',

    fontSize:
      fontScale(13),

    fontWeight: '500',
  },

  value: {
    fontSize:
      fontScale(28),

    fontWeight: '700',

    color: '#111',

    marginTop:
      verticalScale(6),
  },

  subtitle: {
    color: '#888',

    marginTop:
      verticalScale(5),

    fontSize:
      fontScale(11),

    lineHeight:
      moderateScale(16),
  },
});