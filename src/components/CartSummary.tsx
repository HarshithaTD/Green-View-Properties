import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  subtotal: number;
}

const CartSummary = ({
  subtotal,
}: Props) => {
  const gst =
    subtotal * 0.05;

  const booking =
    subtotal * 0.1;

  const total =
    subtotal +
    gst +
    booking;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Price Summary
      </Text>

      <Text>
        Subtotal :
        ₹
        {subtotal}
      </Text>

      <Text>
        GST(5%) :
        ₹
        {gst}
      </Text>

      <Text>
        Booking(10%) :
        ₹
        {booking}
      </Text>

      <Text
        style={
          styles.total
        }>
        Total :
        ₹
        {total}
      </Text>
    </View>
  );
};

export default CartSummary;

const styles =
  StyleSheet.create({
    card: {
      padding: 15,
      borderRadius: 12,
      backgroundColor:
        '#fff',
      marginVertical: 15,
    },

    heading: {
      fontWeight: '700',
      marginBottom: 10,
    },

    total: {
      marginTop: 10,
      fontWeight: '700',
      color: 'green',
    },
  });