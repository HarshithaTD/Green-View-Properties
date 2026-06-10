import React, {
  useCallback,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {skipToken} from '@reduxjs/toolkit/query';
import styles from '../styles/bookingStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { useGetBookingSummaryQuery } from '../services/bookingApi';


import BottomTab from '../components/BottomTab';
import { formatCurrency } from '../utils/currency';
import {RootState} from '../redux/store';
import PlotCard from '../components/Booking/PlotCard';
import DetailRow from '../components/Booking/DetailRow';

const BookingSummaryScreen =() => {
    const navigation =
      useNavigation<any>();

    const route =
      useRoute<any>();

    const {
      bookingId,
      plot: routePlot,
    } =
      route.params || {};

    const user =
      useSelector(
        (state: RootState) =>
          state.user.user,
      );

    const {
      data,
      isLoading,
      error,
    } = useGetBookingSummaryQuery(
      bookingId || skipToken,
    );

    const parseAmount =
      useCallback((amount: any) => {
        return (
          Number(
            String(amount || '').replace(
              /[^0-9.]/g,
              '',
            ),
          ) || 0
        );
      }, []);

    const selectedPlot =
      routePlot || data?.plot;

    const plotPrice =
      parseAmount(selectedPlot?.price);

    const summaryData =
      routePlot
        ? {
            plot: {
              ...routePlot,
              price: plotPrice,
            },
            buyer: {
              fullName:
                user?.name || 'N/A',
              mobile:
                user?.phone || 'N/A',
              email:
                user?.email || 'N/A',
            },
            payment: {
              bookingAmount:
                Math.round(
                  plotPrice * 0.1,
                ),
              gst:
                Math.round(
                  plotPrice * 0.05,
                ),
              totalAmount:
                Math.round(
                  plotPrice +
                    plotPrice * 0.1 +
                    plotPrice * 0.05,
                ),
            },
          }
        : data;

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

    if (isLoading && bookingId) {
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

    if (error || !summaryData) {
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
          contentContainerStyle={
            styles.scrollContent
          }
          showsVerticalScrollIndicator={
            false
          }>
          <View
            style={
              styles.header
            }>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.goBack()
              }>
              <Ionicons
                name="arrow-back"
                size={22}
                color="#111827"
              />
            </TouchableOpacity>

            <Text
              style={
                styles.headerTitle
              }>
              Booking Summary
            </Text>

            <View
              style={
                styles.headerSpacer
              }
            />
          </View>

          <PlotCard
            plot={
              summaryData.plot
            }
          />

          <Text
            style={
              styles.sectionTitle
            }>
            Buyer Details
          </Text>

          <View style={styles.detailsCard}>
            <DetailRow
              label="Full Name"
              value={
                summaryData.buyer
                  .fullName
              }
            />

            <DetailRow
              label="Mobile Number"
              value={`+91 ${summaryData.buyer.mobile}`}
            />

            <DetailRow
              label="Email"
              value={
                summaryData.buyer
                  .email
              }
            />
          </View>

          <Text
            style={
              styles.sectionTitle
            }>
            Payment
            Details
          </Text>

          <View style={styles.detailsCard}>
            <DetailRow
              label="Plot Price"
              value={formatCurrency(
                summaryData.plot
                  .price,
              )}
            />

            <DetailRow
              label="Booking Amount (10%)"
              value={formatCurrency(
                summaryData
                  .payment
                  .bookingAmount,
              )}
            />

            <DetailRow
              label="GST (5%)"
              value={formatCurrency(
                summaryData
                  .payment
                  .gst,
              )}
            />

            <DetailRow
              label="Total Amount"
              value={formatCurrency(
                summaryData
                  .payment
                  .totalAmount,
              )}
              rowStyle={
                styles.totalRow
              }
              labelStyle={
                styles.totalLabel
              }
              valueStyle={
                styles.total
              }
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.payButton}>
            <Text style={styles.payButtonText}>
              Proceed to Pay
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <BottomTab/>
      </View>
    );
  };

export default React.memo(
  BookingSummaryScreen,
);
