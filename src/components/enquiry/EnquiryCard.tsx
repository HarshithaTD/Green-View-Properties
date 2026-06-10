import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  item: any;
  onPress: () => void;
}

const EnquiryCard = ({
  item,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
      }}
      onPress={onPress}>
      <View
        style={{
          marginTop: 12,
        }}>
        <Text>
          {item.plotTitle}
        </Text>

        <Text>
          {item.plotLocation}
        </Text>

        <Text>
          ₹ {item.plotPrice}
        </Text>

        <Text>
          Status:
          {' '}
          {item.status}
        </Text>

        <View
          style={{
            flexDirection:
              'row',
            alignItems:
              'center',
            marginTop: 10,
          }}>
          <Ionicons
            name="calendar-outline"
            size={18}
          />

          <Text
            style={{
              marginLeft: 5,
            }}>
            {new Date(
              item.createdAt,
            ).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EnquiryCard;