// src/components/AuthInput.tsx

import React, {useState} from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';

interface Props {
  value: string;
  onChangeText: (text: string) => void;

  icon: string;
  placeholder: string;
  secureTextEntry?: boolean;
  isPhone?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function AuthInput({
  value,
  onChangeText,

  icon,
  placeholder,
  secureTextEntry,
  isPhone,
  keyboardType,
  autoCapitalize = 'sentences',

}: Props) {
  const [hide, setHide] = useState(
    secureTextEntry || false,
  );

 const handlePhoneChange = (
    text: string,
  ) => {
    // Allow only numbers and max 10 digits
    const cleaned = text
      .replace(/[^0-9]/g, '')
      .slice(0, 10);

    onChangeText(cleaned);
  };


  return (
    <View style={styles.container}>
      <Feather
        name={icon}
        size={scale(20)}
        color="#355E3B"
      />

      <TextInput
        value={value}
        onChangeText={ isPhone
            ? handlePhoneChange
            : onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={hide}
        style={styles.input}
        keyboardType={
          isPhone
            ? 'phone-pad'
            : keyboardType || 'default'
        }
        autoCapitalize={autoCapitalize}
        maxLength={isPhone ? 10 : undefined}
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setHide(!hide)}>
          <Feather
            name={
              hide ? 'eye' : 'eye-off'
            }
            size={scale(20)}
            color="#999"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(50),

    borderWidth: 1,

    borderColor: '#d1c8c8',

    borderRadius: moderateScale(18),

    backgroundColor: '#fff',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: scale(10),

    marginBottom: verticalScale(10),
  },

  input: {
    flex: 1,

    marginLeft: scale(14),

    fontSize: fontScale(15),

    color: '#111',
  },
});
