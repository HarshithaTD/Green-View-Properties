import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import styles from '../../../screens/admin/styles';

type SubmitButtonProps = {
  loading: boolean;
  isEditing: boolean;
  onPress: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  isEditing,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
      style={styles.addButton}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={styles.addButtonText}>
          {isEditing ? 'Update Plot' : 'Add Plot'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
