import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../screens/bookingStyles'

interface Props {
  label: string;
  value: string;
  rowStyle?: any;
  labelStyle?: any;
  valueStyle?: any;
}

const DetailRow = ({
  label,
  value,
  rowStyle,
  labelStyle,
  valueStyle,
}: Props) => {
  return (
    <View
      style={[
        styles.row,
        rowStyle,
      ]}>
      <Text
        style={[
          styles.label,
          labelStyle,
        ]}>
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
