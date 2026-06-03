import React, {memo} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Props {
  item: any;
  onRemove: (
    cartId: string,
  ) => void;
}

const CartItem = ({
  item,
  onRemove,
}: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.plotId.image,
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>
          {item.plotId.title}
        </Text>

        <Text>
          {item.plotId.location}
        </Text>

        <Text>
          Area:
          {' '}
          {item.plotId.size}
        </Text>

        <Text>
          Price:
          {' '}
          ₹
          {item.plotId.price}
        </Text>

        <Text>
          Facing:
          {' '}
          {item.plotId.facing}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          onRemove(item._id)
        }>
        <Text
          style={
            styles.remove
          }>
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(
  CartItem,
);

const styles =
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      padding: 12,
      marginBottom: 15,
      borderRadius: 12,
      backgroundColor:
        '#fff',
      elevation: 2,
    },

    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },

    info: {
      flex: 1,
      marginLeft: 12,
    },

    title: {
      fontSize: 16,
      fontWeight: '600',
    },

    remove: {
      color: 'red',
      fontWeight: '600',
    },
  });