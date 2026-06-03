import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import styles from '../../../screens/admin/styles';
import { scale } from '../../../utils/responsive';
import { PRIMARY } from './constants';

type PlotFormHeaderProps = {
  isEditing: boolean;
  onBack: () => void;
};

const PlotFormHeader: React.FC<PlotFormHeaderProps> = ({
  isEditing,
  onBack,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton} onPress={onBack}>
        <Feather name="arrow-left" size={scale(24)} color="#111827" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        {isEditing ? 'Edit Plot' : 'Add New Plot'}
      </Text>

      <TouchableOpacity style={styles.iconButton}>
        <Feather name="upload-cloud" size={scale(22)} color={PRIMARY} />
      </TouchableOpacity>
    </View>
  );
};

export default PlotFormHeader;
