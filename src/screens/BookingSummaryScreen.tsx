import React, {
  useCallback,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './bookingStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useGetBookingSummaryQuery } from '../services/bookingApi';
import DetailRow from '../components/Booking/DetailRow';


import CustomButton from '../components/CustomButton';
import { BookingResponse } from '../types/bookingTypes';
import PlotCard from '../components/Booking/PlotCard';

import BottomTab from '../components/BottomTab';
import { formatCurrency } from '../utils/currency';

interface Props {
  plot: BookingResponse['plot'];
}

const BookingSummaryScreen =() => {
    const navigation =
      useNavigation();

    const route =
      useRoute<any>();

    const {bookingId} =
      route.params;

    const {
      data,
      isLoading,
      error,
    } = useGetBookingSummaryQuery(bookingId);

    // const goPayment =
    //   useCallback(() => {
    //     navigation.navigate(
    //       'PaymentScreen',
    //       {
    //         bookingId,
    //       },
    //     );
    //   }, [

    //     navigation,
    //     bookingId,
    //   ]);

    if (isLoading) {
      return (
        <View
          style={
            styles.loader
          }>
          <ActivityIndicator
            size="large"
            color="#1E8E3E"
          />
        </View>
      );
    }

    if (error) {
      return (
        <View
          style={
            styles.loader
          }>
          <Text>
            Failed to load
            booking.
          </Text>
        </View>
      );
    }

    return (
      <View
        style={
          styles.container
        }>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }>
          <View
            style={
              styles.header
            }>
            <Ionicons
              name="arrow-back"
              size={24}
            />

            <Text
              style={
                styles.headerTitle
              }>
              Booking
              Summary
            </Text>
          </View>

          <PlotCard
            plot={
              data!.plot
            }
          />

          <Text
            style={
              styles.sectionTitle
            }>
            Buyer Details
          </Text>

          <DetailRow
            label="Full Name"
            value={
              data!.buyer
                .fullName
            }
          />

          <DetailRow
            label="Mobile Number"
            value={`+91 ${data!.buyer.mobile}`}
          />

          <DetailRow
            label="Email"
            value={
              data!.buyer
                .email
            }
          />

          <Text
            style={
              styles.sectionTitle
            }>
            Payment
            Details
          </Text>

          <DetailRow
            label="Plot Price"
            value={formatCurrency(
              data!.plot
                .price,
            )}
          />

          <DetailRow
            label="Booking Amount (10%)"
            value={formatCurrency(
              data!
                .payment
                .bookingAmount,
            )}
          />

          <DetailRow
            label="GST (5%)"
            value={formatCurrency(
              data!
                .payment
                .gst,
            )}
          />

          <DetailRow
            label="Total Amount"
            value={formatCurrency(
              data!
                .payment
                .totalAmount,
            )}
            valueStyle={
              styles.total
            }
          />

          {/* <CustomButton
  title="Proceed to Pay"
//   onPress={goPayment}
/> */}
        </ScrollView>
        <BottomTab/>
      </View>
    );
  };

export default React.memo(
  BookingSummaryScreen,
);