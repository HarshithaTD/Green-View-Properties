import React, {useMemo} from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BookingResponse} from '../../types/bookingTypes';
import {API_HOST} from '../../services/apiConfig';
import styles from '../../styles/bookingStyles';
import {formatCurrency} from '../../utils/currency';

interface Props {
  plot: BookingResponse['plot'];
}

const PlotCard = ({
  plot,
}: Props) => {
  const imageUri = useMemo(
    () => {
      const image =
        plot?.image || '';

      if (
        image.startsWith(
          'http',
        )
      ) {
        return image;
      }

      return `${API_HOST}/${image.replace(
        /^\/+/,
        '',
      )}`;
    },
    [plot?.image],
  );

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={styles.title}>
          {plot.title}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.subtitle}>
          {plot.location}
        </Text>

        <View style={styles.plotMetaRow}>
          <View style={styles.plotMetaItem}>
            <Ionicons
              name="expand-outline"
              size={13}
              color="#111827"
            />

            <Text style={styles.size}>
              {plot.size}
            </Text>
          </View>

          <View style={styles.plotMetaItem}>
            <Ionicons
              name="cash-outline"
              size={13}
              color="#111827"
            />

            <Text style={styles.price}>
              {formatCurrency(
                plot.price,
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(
  PlotCard,
);
