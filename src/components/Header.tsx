import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {RootState} from '../redux/store';

import {useGetCartCountQuery} from '../services/cartApi';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

export default function Header() {
  const navigation = useNavigation<any>();

  const userId = useSelector(
    (state: RootState) =>
      state.user.user?._id,
  );

  const {data} = useGetCartCountQuery(
    userId!,
    {
      skip: !userId,
    },
  );

  const cartCount =
    data?.count || 0;

  return (
    <View style={styles.container}>
      {/* Menu */}
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

      {/* Right Icons */}
      <View style={styles.rightContainer}>
        {/* Cart */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate('Cart')
          }>
          <Feather
            name="shopping-cart"
            size={scale(22)}
            color="#000"
          />

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text
                style={
                  styles.badgeText
                }>
                {cartCount > 99
                  ? '99+'
                  : cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical:
      verticalScale(18),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',

    backgroundColor: '#fff',
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },

  iconButton: {
    width: scale(42),
    height: scale(42),

    borderRadius:
      moderateScale(12),

    justifyContent:
      'center',

    alignItems: 'center',

    backgroundColor:
      '#F7F7F7',

    shadowColor: '#000',

    shadowOpacity: 0.03,

    shadowRadius:
      moderateScale(4),

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  badge: {
    position: 'absolute',

    top: -4,
    right: -4,

    minWidth: scale(18),
    height: scale(18),

    borderRadius: scale(9),

    backgroundColor:
      '#EF4444',

    justifyContent:
      'center',

    alignItems: 'center',

    paddingHorizontal:
      scale(4),
  },

  badgeText: {
    color: '#fff',

    fontSize:
      fontScale(10),

    fontWeight: '700',
  },

  title: {
    fontSize:
      fontScale(18),

    fontWeight: '700',

    color: '#000',

    letterSpacing: 0.3,
  },
});
