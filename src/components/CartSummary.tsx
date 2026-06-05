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

import {formatCurrency} from '../utils/currency';

interface Props {
  subtotal: number;
}

const CartSummary = ({
  subtotal,
}: Props) => {
  const gst = subtotal * 0.05;

  const booking = subtotal * 0.1;

  const total =
    subtotal + gst + booking;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Price Summary
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Subtotal
        </Text>

        <Text style={styles.value}>
          {formatCurrency(
            subtotal,
          )}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          GST (5%)
        </Text>

        <Text style={styles.value}>
          {formatCurrency(
            gst,
          )}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Booking Amount
          (10%)
        </Text>

        <Text style={styles.value}>
          {formatCurrency(
            booking,
          )}
        </Text>
      </View>

      <View
        style={
          styles.divider
        }
      />

      <View style={styles.row}>
        <Text
          style={
            styles.totalText
          }>
          Total Amount
        </Text>

        <Text
          style={
            styles.totalText
          }>
          {formatCurrency(
            total,
          )}
        </Text>
      </View>
    </View>
  );
};

export default CartSummary;


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: moderateScale(18),

    borderWidth: 1,

    borderColor: '#E5E7EB',

    padding: moderateScale(18),

    marginVertical: verticalScale(12),

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: moderateScale(10),

    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },

    elevation: 2,
  },

  heading: {
    fontSize: fontScale(20),

    fontWeight: '700',

    color: '#111827',

    marginBottom: verticalScale(20),
  },

  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: verticalScale(16),
  },

  label: {
    fontSize: fontScale(14),

    color: '#4B5563',

    flex: 1,
  },

  value: {
    fontSize: fontScale(14),

    fontWeight: '600',

    color: '#111827',

    marginLeft: scale(12),
  },

  divider: {
    borderBottomWidth: 1,

    borderStyle: 'dashed',

    borderColor: '#D1D5DB',

    marginBottom: verticalScale(20),
  },

  totalText: {
    fontSize: fontScale(18),

    fontWeight: '700',

    color: '#0B8A3E',
  },
});