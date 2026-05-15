// src/components/CustomInput.tsx

import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

interface Props extends TextInputProps {
  label: string;
  multilineInput?: boolean;
   value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: any;
}

export default function CustomInput({
   value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  label,
  multilineInput,
  style,
  ...rest
}: Props) {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>
        {label}
      </Text>

      {/* Input */}
      <TextInput
        {...rest}
         value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      
        multiline={multilineInput}
        textAlignVertical={
          multilineInput ? 'top' : 'center'
        }
        style={[
          styles.input,
          multilineInput &&
            styles.multilineInput,
          style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
  },

  label: {
    marginBottom: verticalScale(8),

    fontSize: fontScale(12),

    fontWeight: '600',

    color: '#222',
  },

  input: {
    height: verticalScale(48),

    borderWidth: 1,

    borderColor: '#E5E5E5',

    borderRadius: moderateScale(10),

    paddingHorizontal: scale(14),

    fontSize: fontScale(13),

    color: '#000',

    backgroundColor: '#fff',
  },

  multilineInput: {
    height: verticalScale(100),

    paddingTop: verticalScale(14),
  },
});