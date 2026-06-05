import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../screens/bookingStyles';


interface Props {
  label: string;
  value: string;
  valueStyle?: any;
}

const DetailRow = ({
  label,
  value,
  valueStyle,
}: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text
        style={[
          styles.value,
          valueStyle,
        ]}>
        {value}
      </Text>
    </View>
  );
};

export default React.memo(
  DetailRow,
);