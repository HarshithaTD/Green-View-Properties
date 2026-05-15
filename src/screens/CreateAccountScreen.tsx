// src/screens/CreateAccountScreen.tsx

import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';

import {updateProfile} from '../redux/slices/userSlice';

import AppLogo from '../components/AppLogo';
import PhoneInput from '../components/PhoneInput';
import AuthFooter from '../components/AuthFooter';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

import {
  scale,
  verticalScale,
  fontScale,
} from '../utils/responsive';

export default function CreateAccountScreen() {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '');

    setPhone(cleaned);

    if (cleaned.length === 0) {
      setError('');
    } else if (cleaned.length !== 10) {
      setError(
        'Please enter valid 10 digit mobile number',
      );
    } else {
      setError('');
    }
  };

  const onSendOtp = () => {
    if (phone.length !== 10) {
      return;
    }

    // Save User Data to Redux
    dispatch(
      updateProfile({
        name: name,
        email: email,
        phone: `+91 ${phone}`,
        image: '',
      }),
    );

    // Navigate
    navigation.navigate('OtpVerification', {
      phone,
      name,
      email,
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
        <View style={styles.content}>
          {/* Logo */}
          <AppLogo />

          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              Create Account
            </Text>

            <Text style={styles.subHeading}>
              Enter your details to get
              started
            </Text>
          </View>

          {/* Name Input */}
          <CustomInput
            label="Enter the Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          {/* Email Input */}
          <CustomInput
          label="Enter the Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Phone Input */}
          <View style={styles.phoneWrapper}>
            <PhoneInput
              value={phone}
              onChangeText={validatePhone}
              error={error}
            />
          </View>

          {/* Button */}
          <CustomButton
            title="Send OTP"
            onPress={onSendOtp}
          />

          {/* Footer */}
          <AuthFooter
            onLogin={() =>
              navigation.navigate('Login')
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  content: {
    flex: 1,

    paddingHorizontal: scale(24),

    paddingTop: verticalScale(20),
  },

  headingContainer: {
    marginTop: verticalScale(25),
  },

  heading: {
    fontSize: fontScale(30),

    fontWeight: '800',

    color: '#111',
  },

  subHeading: {
    marginTop: verticalScale(10),

    fontSize: fontScale(15),

    color: '#777',
    marginBottom:verticalScale(15),
    lineHeight: verticalScale(24),
  },

  phoneWrapper: {
    marginTop: verticalScale(16),
  },
});