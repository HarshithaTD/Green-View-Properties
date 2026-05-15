// src/screens/LoginScreen.tsx

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

import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

import AuthInput from '../components/Login/AuthInput';
import AuthButton from '../components/Login/AuthButton';

export default function LoginScreens() {
  const navigation = useNavigation<any>();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        'Error',
        'Please fill all fields',
      );
      return;
    }

    try {
      const userCredential =
        await auth().signInWithEmailAndPassword(
          email,
          password,
        );

      Alert.alert(
        'Success',
        'Login Successful',
      );

      console.log(
        'User:',
        userCredential.user,
      );

      // Navigate to Dashboard
      navigation.replace('Dashboard');

    } catch (error: any) {
      console.log(error);

      if (
        error.code ===
        'auth/user-not-found'
      ) {
        Alert.alert(
          'Error',
          'User not found',
        );
      } else if (
        error.code ===
        'auth/wrong-password'
      ) {
        Alert.alert(
          'Error',
          'Wrong password',
        );
      } else if (
        error.code ===
        'auth/invalid-email'
      ) {
        Alert.alert(
          'Error',
          'Invalid email',
        );
      } else {
        Alert.alert(
          'Login Error',
          error.message,
        );
      }
    }
  };

  

const handleForgotPassword = async () => {
  if (!email) {
    Alert.alert(
      'Error',
      'Please enter your email address',
    );
    return;
  }

  try {
    await auth().sendPasswordResetEmail(
      email,
    );

    Alert.alert(
      'Success',
      'Password reset email sent',
    );
  } catch (error: any) {
    console.log(error);

    if (
      error.code ===
      'auth/user-not-found'
    ) {
      Alert.alert(
        'Error',
        'User not found',
      );
    } else if (
      error.code ===
      'auth/invalid-email'
    ) {
      Alert.alert(
        'Error',
        'Invalid email address',
      );
    } else {
      Alert.alert(
        'Error',
        error.message,
      );
    }
  }
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

            {/* Logo */}
            <Image
              source={require('../assets/images/logo1.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Heading */}
            <Text style={styles.title}>
              Welcome Back!
            </Text>

            <Text style={styles.subtitle}>
              Login to continue to
              GreenView Properties
            </Text>

            {/* Inputs */}
            <View style={styles.form}>

              <AuthInput
                icon="mail"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
              />

              <AuthInput
                icon="lock"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Forgot Password */}
             <TouchableOpacity
  onPress={handleForgotPassword}>
  <Text
    style={styles.forgotText}>
    Forgot Password?
  </Text>
</TouchableOpacity>

              {/* Login Button */}
              <AuthButton
                title="LOGIN"
                onPress={handleLogin}
              />

            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />

              <Text style={styles.or}>
                OR
              </Text>

              <View style={styles.line} />
            </View>

            {/* Register Navigation */}
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>
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

          {/* Footer */}
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

    paddingTop: verticalScale(24),
  },

  logo: {
    width: scale(240),

    height: verticalScale(140),

    alignSelf: 'center',
  },

  title: {
    marginTop: verticalScale(24),

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

    height: verticalScale(200),

    
  },
});