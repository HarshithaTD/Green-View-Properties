// src/components/AuthFooter.tsx

import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  fontScale,
} from '../utils/responsive';

export default function AuthFooter({
  onLogin,
}: any) {
  return (
    <>
      {/* Security */}
      <View style={styles.securityContainer}>
        <Feather
          name="shield"
          size={scale(18)}
          color="#5A5A5A"
        />

        <Text style={styles.securityText}>
          Your data is safe with us and
          will never be shared.
        </Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        By continuing, you agree to our
      </Text>

      <View style={styles.termsRow}>
        <TouchableOpacity>
          <Text style={styles.linkText}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>

        <Text style={styles.andText}>
          and
        </Text>

        <TouchableOpacity>
          <Text style={styles.linkText}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Already have an account?
        </Text>

        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.loginText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  securityContainer: {
    marginTop: verticalScale(30),

    flexDirection: 'row',

    alignItems: 'flex-start',

    justifyContent: 'center',

    paddingHorizontal: scale(20),
  },

  securityText: {
    marginLeft: scale(10),

    flex: 1,

    fontSize: fontScale(13),

    lineHeight: verticalScale(20),

    color: '#666',
  },

  terms: {
    marginTop: verticalScale(25),

    textAlign: 'center',

    fontSize: fontScale(13),

    color: '#666',
  },

  termsRow: {
    flexDirection: 'row',

    justifyContent: 'center',

    marginTop: verticalScale(5),

    flexWrap: 'wrap',
  },

  linkText: {
    color: '#0E9F4B',

    fontWeight: '700',

    fontSize: fontScale(13),
  },

  andText: {
    marginHorizontal: scale(5),

    color: '#666',

    fontSize: fontScale(13),
  },

  bottomContainer: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 'auto',

    marginBottom: verticalScale(35),
  },

  bottomText: {
    color: '#666',

    fontSize: fontScale(14),
  },

  loginText: {
    marginLeft: scale(8),

    color: '#0E9F4B',

    fontWeight: '700',

    fontSize: fontScale(14),
  },
});