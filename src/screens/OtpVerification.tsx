// src/screens/OtpVerificationScreen.tsx

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import CustomButton from '../components/CustomButton';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

export default function OtpVerificationScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const phone =
    route?.params?.phone ||
    '98765 43210';

  const [otp, setOtp] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [timer, setTimer] = useState(28);

  const inputRefs = useRef<any[]>([]);

  // Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () =>
        clearInterval(interval);
    }
  }, [timer]);

  // OTP Change Handler
  const handleOtpChange = (
    text: string,
    index: number,
  ) => {
    // Allow only numbers
    if (!/^\d*$/.test(text)) {
      return;
    }

    const updatedOtp = [...otp];

    updatedOtp[index] = text;

    setOtp(updatedOtp);

    // Move to next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const otpValue = otp.join('');

  const isVerified =
    otpValue.length === 6;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
        <View style={styles.content}>
          {/* Header */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }>
            <Feather
              name="arrow-left"
              size={scale(24)}
              color="#111"
            />
          </TouchableOpacity>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Verify OTP
            </Text>

            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to
            </Text>

            <View style={styles.phoneRow}>
              <Text style={styles.phone}>
                +91 {phone}
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('CreateAccount')
                }>
                <Text style={styles.changeText}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref =>
                (inputRefs.current[index] =
                  ref)
                }
                value={digit}
                onChangeText={text =>
                  handleOtpChange(
                    text,
                    index,
                  )
                }
                onKeyPress={({
                  nativeEvent,
                }) => {
                  if (
                    nativeEvent.key ===
                    'Backspace' &&
                    !digit &&
                    index > 0
                  ) {
                    inputRefs.current[
                      index - 1
                    ]?.focus();
                  }
                }}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={index === 0}
                selectionColor="#0E9F4B"
                style={styles.otpInput}
              />
            ))}
          </View>

          {/* Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Resend OTP in{' '}
            </Text>

            <Text style={styles.timer}>
              00:
              {timer < 10
                ? `0${timer}`
                : timer}
            </Text>
          </View>

          {/* Success Message */}
          {isVerified && (
            <View style={styles.successCard}>
              <Feather
                name="check-circle"
                size={scale(20)}
                color="#67B546"
              />

              <View
                style={{
                  marginLeft: scale(12),
                }}>
                <Text
                  style={
                    styles.successTitle
                  }>
                  OTP verified
                  successfully!
                </Text>

                <Text
                  style={
                    styles.successSubtitle
                  }>
                  Please complete your
                  registration.
                </Text>
              </View>
            </View>
          )}

          {/* Button */}
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Continue"
              onPress={() => {
                if (isVerified) {
                  navigation.navigate(
                    'Login',
                  );
                }
              }}
            />
          </View>
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

  titleContainer: {
    marginTop: verticalScale(45),
  },

  title: {
    fontSize: fontScale(32),
    fontWeight: '800',
    color: '#111',
  },

  subtitle: {
    marginTop: verticalScale(12),
    fontSize: fontScale(15),
    color: '#777',
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  phone: {
    fontSize: fontScale(16),
    fontWeight: '700',
    color: '#111',
  },

  changeText: {
    marginLeft: scale(14),
    color: '#0E9F4B',
    fontWeight: '700',
    fontSize: fontScale(14),
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(45),
  },

  otpInput: {
    width: scale(48),
    height: scale(56),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: moderateScale(12),
    textAlign: 'center',
    fontSize: fontScale(22),
    fontWeight: '700',
    color: '#111',
    backgroundColor: '#fff',
  },

  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: verticalScale(24),
  },

  timerText: {
    color: '#666',
    fontSize: fontScale(14),
  },

  timer: {
    color: '#0E9F4B',
    fontSize: fontScale(14),
    fontWeight: '700',
  },

  successCard: {
    marginTop: verticalScale(35),
    backgroundColor: '#F1F8EE',
    borderRadius: moderateScale(14),
    padding: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },

  successTitle: {
    color: '#111',
    fontWeight: '700',
    fontSize: fontScale(14),
  },

  successSubtitle: {
    marginTop: verticalScale(3),
    color: '#666',
    fontSize: fontScale(12),
  },

  buttonWrapper: {
    marginTop: verticalScale(45),
  },
});