import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from '../../styles/helpAndSupportStyle';

const InfoCard = () => {
  return (
    <View style={styles.infoCard}>
      <Ionicons
        name="shield-checkmark-outline"
        size={34}
        color="#16A34A"
      />

      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>
          Your satisfaction is our priority
        </Text>

        <Text style={styles.infoSub}>
          We're committed to providing
          the best support experience.
        </Text>
      </View>
    </View>
  );
};

export default InfoCard;