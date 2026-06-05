import React, {useMemo} from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import styles from '../../screens/bookingStyles';
import { BookingResponse } from '../../types/bookingTypes';
import { API_HOST } from '../../services/apiConfig';
import { formatCurrency } from '../../utils/currency';



interface Props {
  plot: BookingResponse['plot'];
}

const PlotCard = ({
  plot,
}: Props) => {
  const imageUri = useMemo(
    () =>
      plot.image.startsWith(
        'http',
      )
        ? plot.image
        : `${API_HOST}${plot.image}`,
    [plot.image],
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
        <Text style={styles.title}>
          {plot.title}
        </Text>

        <Text
          style={styles.subtitle}>
          {plot.location}
        </Text>

        <Text style={styles.size}>
          📏 {plot.size}
        </Text>

        <Text style={styles.price}>
          {formatCurrency(
            plot.price,
          )}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(
  PlotCard,
);