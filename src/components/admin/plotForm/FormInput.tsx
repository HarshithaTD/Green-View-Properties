import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import styles from '../../../screens/admin/styles';

type FormInputProps = TextInputProps & {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  multiline,
  containerStyle,
  style,
  ...inputProps
}) => {
  return (
    <View style={[styles.inputWrapper, containerStyle]}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}

      <TextInput
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        style={[styles.input, multiline && styles.multilineInput, style]}
        {...inputProps}
      />
    </View>
  );
};

export default FormInput;
