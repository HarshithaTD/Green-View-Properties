import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from '../../styles/helpAndSupportStyle';

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  value: string;
  onPress: () => void;
}

const ContactCard = ({
  icon,
  title,
  subtitle,
  value,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={styles.contactCard}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.contactIcon}>
        <Ionicons
          name={icon}
          size={26}
          color="#16A34A"
        />
      </View>

      <View style={styles.contactContent}>
        <Text style={styles.contactTitle}>
          {title}
        </Text>

        <Text style={styles.contactSub}>
          {subtitle}
        </Text>

        <Text style={styles.contactValue}>
          {value}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#666"
      />
    </TouchableOpacity>
  );
};

export default ContactCard;