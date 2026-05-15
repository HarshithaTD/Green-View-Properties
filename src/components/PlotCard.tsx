import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import {PlotType} from '../data/plotsData';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

interface Props {
  item: PlotType;
}

export default function PlotCard({item}: Props) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.content}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <Text
            numberOfLines={1}
            style={styles.title}>
            {item.title}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Location */}
        <Text
          numberOfLines={1}
          style={styles.location}>
          {item.location}, {item.sector}
        </Text>

        {/* Size + Price */}
        <View style={styles.infoRow}>
          <View style={styles.iconRow}>
            <Feather
              name="maximize"
              size={scale(12)}
              color="#666"
            />

            <Text style={styles.infoText}>
              {item.size}
            </Text>
          </View>

          <Text style={styles.price}>
            {item.price}
          </Text>
        </View>

        {/* Dimension */}
        {/* <Text style={styles.dimension}>
          Dimension: {item.dimension}
        </Text>

        {/* Facing */}
        {/* <Text style={styles.facing}>
          {item.facing}
        </Text> */} 

        {/* Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() =>
            navigation.navigate('PlotDetails', {
              plot: item,
            })
          }>
          <Text style={styles.buttonText}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    backgroundColor: '#fff',

    borderRadius: moderateScale(14),

    marginBottom: verticalScale(14),

    padding: moderateScale(10),

    borderWidth: 1,
    borderColor: '#EFEFEF',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(5),

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  image: {
    width: scale(95),
    height: scale(95),

    borderRadius: moderateScale(10),

    resizeMode: 'cover',
  },

  content: {
    flex: 1,

    marginLeft: scale(12),

    justifyContent: 'space-between',
  },

  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  title: {
    flex: 1,

    fontWeight: '700',

    fontSize: fontScale(15),

    color: '#000',

    marginRight: scale(8),
  },

  badge: {
    backgroundColor: '#E8F7EE',

    paddingHorizontal: scale(10),

    paddingVertical: verticalScale(4),

    borderRadius: moderateScale(20),
  },

  badgeText: {
    color: '#0E8F4B',

    fontSize: fontScale(10),

    fontWeight: '700',
  },

  location: {
    marginTop: verticalScale(5),

    color: '#777',

    fontSize: fontScale(12),
  },

  infoRow: {
    marginTop: verticalScale(10),

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  iconRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  infoText: {
    marginLeft: scale(5),

    fontSize: fontScale(12),

    color: '#000',

    fontWeight: '600',
  },

  price: {
    fontSize: fontScale(14),

    fontWeight: '700',

    color: '#000',
  },

  dimension: {
    marginTop: verticalScale(6),

    fontSize: fontScale(11),

    color: '#666',
  },

  facing: {
    marginTop: verticalScale(4),

    fontSize: fontScale(11),

    color: '#0E8F4B',

    fontWeight: '600',
  },

  button: {
    marginTop: verticalScale(12),

    borderWidth: 1,

    borderColor: '#0E8F4B',

    borderRadius: moderateScale(8),

    height: verticalScale(36),

    justifyContent: 'center',

    alignItems: 'center',
  },

  buttonText: {
    color: '#0E8F4B',

    fontWeight: '700',

    fontSize: fontScale(13),
  },
});