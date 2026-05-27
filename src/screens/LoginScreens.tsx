import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateProfile} from '../redux/slices/userSlice';
import {
  scale,
  verticalScale,
  fontScale,
} from '../utils/responsive';
import AuthInput from '../components/Login/AuthInput';
import AuthButton from '../components/Login/AuthButton';
import apiInstance from '../services/apiInstance';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [email, setEmail] =
    useState('');
  const [password, setPassword] =
    useState('');
  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }

    const normalizedEmail =
      email.trim().toLowerCase();
    const cleanPassword =
      password.trim();

    if (
      !normalizedEmail ||
      !cleanPassword
    ) {
      Alert.alert(
        'Error',
        'Please fill all fields',
      );
      return;
    }

    setIsLoading(true);

    try {
      const response =
        await apiInstance.post(
          '/auth/login',
          {
            email: normalizedEmail,
            password: cleanPassword,
          },
        );

      const token =
        response.data?.token;

      if (!token) {
        Alert.alert(
          'Login Failed',
          response.data?.message ||
            'Token not received',
        );
        return;
      }

      await AsyncStorage.setItem(
        'token',
        token,
      );

      const loggedInUser =
        response.data.user || {};

      const userRole =
        loggedInUser.role || 'user';

      await AsyncStorage.setItem(
        'role',
        userRole,
      );

      dispatch(
        updateProfile({
          ...(loggedInUser as any),
          name: loggedInUser.name || '',
          email:
            loggedInUser.email ||
            normalizedEmail,
          phone:
            loggedInUser.phone || '',
          image:
            loggedInUser.image || '',
        }),
      );

      Alert.alert(
        'Success',
        `${userRole} Login Successful`,
      );

      navigation.replace(
        userRole === 'admin'
          ? 'AdminDrawer'
          : 'Dashboard',
      );
    } catch (error: any) {
      console.log(
        'LOGIN ERROR:',
        error?.response?.data ||
          error,
      );

      Alert.alert(
        'Login Error',
        error?.response?.data
          ?.message ||
          'Server not reachable',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      Alert.alert(
        'Error',
        'Please enter your email address',
      );
      return;
    }

    Alert.alert(
      'Password Reset',
      'Password reset feature coming soon.',
    );
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
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }>
          <View style={styles.content}>
            <Image
              source={require('../assets/images/logo1.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              Welcome Back!
            </Text>

            <Text
              style={styles.subtitle}>
              Login to continue to GreenView Properties
            </Text>

            <View style={styles.form}>
              <AuthInput
                icon="mail"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <AuthInput
                icon="lock"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={
                  handleForgotPassword
                }>
                <Text
                  style={
                    styles.forgotText
                  }>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <AuthButton
                title={
                  isLoading
                    ? 'LOGGING IN...'
                    : 'LOGIN'
                }
                onPress={handleLogin}
                disabled={isLoading}
              />
            </View>

            <View
              style={styles.dividerRow}>
              <View style={styles.line} />

              <Text style={styles.or}>
                OR
              </Text>

              <View style={styles.line} />
            </View>

            <View
              style={styles.bottomRow}>
              <Text
                style={
                  styles.bottomText
                }>
                Don't have an account?
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    'Register',
                  )
                }>
                <Text
                  style={
                    styles.greenText
                  }>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Image
            source={require('../assets/images/register-footer.png')}
            style={styles.footerImage}
          />
        </ScrollView>
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
    paddingHorizontal: scale(28),
    paddingTop: verticalScale(20),
  },

  logo: {
    width: scale(240),
    height: verticalScale(140),
    alignSelf: 'center',
  },

  title: {
    marginTop: verticalScale(2),
    fontSize: fontScale(34),
    fontWeight: '800',
    color: '#222',
  },

  subtitle: {
    marginTop: verticalScale(10),
    fontSize: fontScale(17),
    color: '#666',
    lineHeight: verticalScale(28),
  },

  form: {
    marginTop: verticalScale(20),
  },

  forgotText: {
    textAlign: 'right',
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: verticalScale(18),
    fontSize: fontScale(14),
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },

  or: {
    marginHorizontal: scale(18),
    color: '#777',
    fontSize: fontScale(15),
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(20),
  },

  bottomText: {
    color: '#666',
    fontSize: fontScale(15),
  },

  greenText: {
    color: '#2E7D32',
    fontWeight: '700',
    marginLeft: scale(6),
    fontSize: fontScale(15),
  },

  footerImage: {
    width: '100%',
    height: verticalScale(250),
  },
});
