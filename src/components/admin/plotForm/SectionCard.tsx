import React from 'react';
import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import styles from '../../../screens/admin/styles';
import { scale } from '../../../utils/responsive';
import { PRIMARY } from './constants';

type SectionCardProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children }) => {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Feather name={icon} size={scale(18)} color={PRIMARY} />

        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {children}
    </View>
  );
};

export default SectionCard;
