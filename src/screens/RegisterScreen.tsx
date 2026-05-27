
//src/screens/RegisterScreen.tsx

import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';
import AuthInput from '../components/Login/AuthInput';
import AuthButton from '../components/Login/AuthButton';
import apiInstance from '../services/apiInstance';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (isLoading) return;

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanPassword = password.trim();

    // Validation checks
    if (!trimmedName || !normalizedEmail || !cleanPassword || !cleanPhone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(cleanPhone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    // Password validation
    if (cleanPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiInstance.post(
         '/auth/register',
         {
          name: trimmedName,
          email: normalizedEmail,
          password: cleanPassword,
          phone: cleanPhone,
        },
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const registeredUser = response.data?.user || {};

      const userData = {
        name: registeredUser.name || trimmedName,
        email: registeredUser.email || normalizedEmail,
        phone: registeredUser.phone || cleanPhone,
        image: '',
      };

      dispatch(updateProfile(userData));

      Alert.alert(
        'Success',
        response.data?.message || 'Account created successfully',
      );

setTimeout(() => {
  navigation.replace('Login');
}, 500);

    } catch (error: any) {
      console.log('Registration Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = 'Cannot connect to server. Please check if backend is running.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Logo */}
            <Image
              source={require('../assets/images/logo1.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Heading */}
            <Text style={styles.title}>Create Account</Text>

            <Text style={styles.subtitle}>
              Join GreenView Properties and find your perfect plot.
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <AuthInput
                icon="user"
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />

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
                placeholder="Create Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <AuthInput
                icon="phone"
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                isPhone={true}
              />

              <AuthButton
                title={isLoading ? 'REGISTERING...' : 'REGISTER'}
                onPress={handleRegister}
                disabled={isLoading}
              />
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.or}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* Login Navigation */}
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.greenText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Image */}
          <Image
            source={require('../assets/images/login-footer.png')}
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
    paddingTop: verticalScale(2),
  },

  logo: {
    width: scale(340),
    height: verticalScale(150),
    alignSelf: 'center',
  },

  title: {
    fontSize: fontScale(35),
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
    marginTop: verticalScale(18),
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(15),
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
    marginTop: verticalScale(0),
    marginBottom: verticalScale(5),
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
    height: verticalScale(180),
  },
});
