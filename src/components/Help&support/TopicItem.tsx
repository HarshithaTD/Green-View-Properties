import React from 'react';

import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from '../../styles/helpAndSupportStyle';

const TopicItem = ({
  item,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      style={styles.topicItem}
      onPress={onPress}>
      <View style={styles.topicLeft}>
        <View style={styles.topicIcon}>
          <Ionicons
            name={item.icon}
            size={20}
            color="#16A34A"
          />
        </View>

        <Text style={styles.topicTitle}>
          {item.title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
      />
    </TouchableOpacity>
  );
};

export default TopicItem;