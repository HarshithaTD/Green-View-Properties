// src/screens/RegisterScreen.tsx

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

import {useDispatch} from 'react-redux';

import {updateProfile} from '../redux/slices/userSlice';

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

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');
  const [phone, setPhone] =
    useState('');

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !phone
    ) {
      Alert.alert(
        'Error',
        'Please fill all fields',
      );
      return;
    }

   try {
  const userCredential =
    await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

  // Update Firebase profile
  await userCredential.user.updateProfile({
    displayName: name,
  });

  // Create user object
  const userData = {
    name: name,
    email: email,
    phone: phone,
    image: '',
  };

  // Save in Redux
  dispatch(updateProfile(userData));

  console.log(
    'Registered User Data:',
    userData,
  );

  Alert.alert(
    'Success',
    'Account created successfully',
  );

  navigation.navigate('Login');

} 
    catch (error: any) {
      console.log(error);

      if (
        error.code ===
        'auth/email-already-in-use'
      ) {
        Alert.alert(
          'Error',
          'Email already exists',
        );
      } else if (
        error.code ===
        'auth/invalid-email'
      ) {
        Alert.alert(
          'Error',
          'Invalid email address',
        );
      } else if (
        error.code ===
        'auth/weak-password'
      ) {
        Alert.alert(
          'Error',
          'Password should be at least 6 characters',
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
              Create Account
            </Text>

            <Text style={styles.subtitle}>
              Join GreenView Properties
              and find your perfect plot.
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
              />

              <AuthButton
                title="REGISTER"
                onPress={handleRegister}
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

            {/* Login Navigation */}
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    'Login',
                  )
                }>

                <Text
                  style={styles.greenText}>
                  Login
                </Text>

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
    marginTop: verticalScale(2),
    marginBottom: verticalScale(10),
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
    height: verticalScale(160),
   
   
  },
});