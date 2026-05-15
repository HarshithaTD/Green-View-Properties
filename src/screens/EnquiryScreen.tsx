// src/screens/EnquiryScreen.tsx

import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {PlotType} from '../data/plotsData';

import CustomInput from '../components/CustomInput';

export default function EnquiryScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const {plot}: {plot: PlotType} =
    route.params;

  const [name, setName] = useState('');
  const [mobile, setMobile] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState(
      'I am interested in this plot. Please share more details.',
    );

  const getEnquiries = async () => {
  const data =
    await AsyncStorage.getItem(
      'ENQUIRIES',
    );

  const enquiries = data
    ? JSON.parse(data)
    : [];

  console.log(enquiries);
};

useEffect(() => {
  getEnquiries();
}, []);

 // Submit Enquiry Function
const handleSubmit = async () => {
  if (!name.trim()) {
    Alert.alert(
      'Validation',
      'Please enter your name',
    );
    return;
  }

  if (!mobile.trim()) {
    Alert.alert(
      'Validation',
      'Please enter mobile number',
    );
    return;
  }

  try {
    setLoading(true);

    const enquiryData = {
      id: Date.now(),
      name,
      mobile,
      email,
      message,

      plotTitle: plot.title,
      plotLocation: plot.location,
      plotPrice: plot.price,

      createdAt: new Date(),
    };

    // Get old data
    const existingData =
      await AsyncStorage.getItem(
        'ENQUIRIES',
      );

    const parsedData = existingData
      ? JSON.parse(existingData)
      : [];

    // Add new enquiry
    parsedData.push(enquiryData);

    // Store updated data
    await AsyncStorage.setItem(
      'ENQUIRIES',
      JSON.stringify(parsedData),
    );

    setLoading(false);

    Alert.alert(
      'Success',
      'Enquiry Submitted',
    );

    // REMOVE OLD DATA FROM FORM
    setName('');
    setMobile('');
    setEmail('');

    setMessage(
      'I am interested in this plot. Please share more details.',
    );

  } catch (error) {
    setLoading(false);

    Alert.alert(
      'Error',
      'Failed to submit enquiry',
    );
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContainer
          }>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.goBack()
              }>
              <Feather
                name="arrow-left"
                size={scale(22)}
                color="#000"
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Enquire About Plot
            </Text>

            <View
              style={{width: scale(22)}}
            />
          </View>

          {/* Plot Card */}
          <View style={styles.plotCard}>
            <Image
              source={plot.image}
              style={styles.plotImage}
            />

            <View style={styles.plotInfo}>
              <Text style={styles.plotTitle}>
                {plot.title}
              </Text>

              <Text
                style={
                  styles.plotLocation
                }>
                {plot.location},{' '}
                {plot.sector}
              </Text>

              <View style={styles.infoRow}>
                <Text
                  style={styles.plotSize}>
                  {plot.size}
                </Text>

                <Text
                  style={
                    styles.plotPrice
                  }>
                  {plot.price}
                </Text>
              </View>
            </View>
          </View>

          {/* Section */}
          <Text style={styles.sectionTitle}>
            Your Details
          </Text>

          {/* Name */}
          <CustomInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter the Name"
          />

          {/* Mobile */}
          <CustomInput
            label="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
          />

          {/* Email */}
          <CustomInput
            label="Email (Optional)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          {/* Message */}
          <CustomInput
            label="Your Message"
            value={message}
            onChangeText={setMessage}
            placeholder="I am interested in this plot. Please share more details."
            multilineInput
          />

          {/* Submit Button */}
         <TouchableOpacity
  activeOpacity={0.8}
  style={styles.submitBtn}
  onPress={handleSubmit}
  disabled={loading}>

  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.submitText}>
      Submit Enquiry
    </Text>
  )}
</TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Feather
              name="shield"
              size={scale(16)}
              color="#777"
            />

            <Text
              style={styles.footerText}>
              We will contact you soon!
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },

  scrollContainer: {
    paddingHorizontal: scale(16),

    paddingBottom:
      verticalScale(40),
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    paddingVertical:
      verticalScale(18),
  },

  headerTitle: {
    fontSize: fontScale(16),

    fontWeight: '700',

    color: '#000',
  },

  plotCard: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',

    borderRadius:
      moderateScale(14),

    padding: moderateScale(10),

    borderWidth: 1,

    borderColor: '#EEEEEE',

    shadowColor: '#000',

    shadowOpacity: 0.04,

    shadowRadius:
      moderateScale(5),

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  plotImage: {
    width: scale(90),

    height: scale(90),

    borderRadius:
      moderateScale(10),

    resizeMode: 'cover',
  },

  plotInfo: {
    flex: 1,

    marginLeft: scale(12),

    justifyContent: 'center',
  },

  plotTitle: {
    fontSize: fontScale(15),

    fontWeight: '700',

    color: '#000',
  },

  plotLocation: {
    marginTop: verticalScale(4),

    fontSize: fontScale(12),

    color: '#666',
  },

  infoRow: {
    marginTop: verticalScale(12),

    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  plotSize: {
    fontSize: fontScale(12),

    color: '#000',

    fontWeight: '600',
  },

  plotPrice: {
    fontSize: fontScale(14),

    color: '#000',

    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: verticalScale(24),

    marginBottom:
      verticalScale(14),

    fontSize: fontScale(15),

    fontWeight: '700',

    color: '#000',
  },

  submitBtn: {
    marginTop: verticalScale(10),

    height: verticalScale(52),

    backgroundColor: '#0E8F4B',

    borderRadius:
      moderateScale(12),

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius:
      moderateScale(5),

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  submitText: {
    color: '#fff',

    fontSize: fontScale(15),

    fontWeight: '700',
  },

  footer: {
    marginTop: verticalScale(28),

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  footerText: {
    marginLeft: scale(8),

    fontSize: fontScale(12),

    color: '#777',
  },
});