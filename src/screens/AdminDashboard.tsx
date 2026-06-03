import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

import { RootState } from '../redux/store';

import socket from '../services/socket';

import StatCard from '../components/admin/StatCard';



import { fetchDashboardData } from '../redux/slices/dashboardSlice';
import FloatingButton from '../components/admin/FloatingButton';
import EnquiryCard from '../components/admin/EnquiryCard';

const { width } = Dimensions.get('window');


// TYPES
interface EnquiryType {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  message?: string;
  plotTitle: string;
  plotLocation: string;
  plotPrice: string;
  status?: string;
  createdAt?: string;
}

interface StatCardType {
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  color: string;
  iconColor: string;
}

interface DashboardStats {
  totalPlots: number;
  availablePlots: number;
  bookedPlots: number;
  soldPlots: number;
}

interface DashboardState {
  stats: DashboardStats;
  enquiries: EnquiryType[];
  loading: boolean;
}

interface Props {
  navigation: any;
}

const AdminDashboardScreen: React.FC<Props> = ({
  navigation,
}) => {

  const dispatch = useDispatch<any>();


  const {
    stats,
    enquiries,
    loading,
  } = useSelector(
    (state: RootState) =>
      state.dashboard,
  ) as DashboardState;


  const [refreshing, setRefreshing] =
    useState<boolean>(false);


  useEffect(() => {

    dispatch(fetchDashboardData());

    socket.on(
      'dashboard:changed',
      () => {
        dispatch(
          fetchDashboardData(),
        );
      },
    );

    return () => {
      socket.off('dashboard:changed');
    };

  }, []);


  const onRefresh = useCallback(
    async () => {

      setRefreshing(true);

      await dispatch(
        fetchDashboardData(),
      );

      setRefreshing(false);

    },
    [],
  );


  const statCards: StatCardType[] = [
    {
      title: 'Total Plots',
      value: stats?.totalPlots || 0,
      subtitle:
        'All plots in system',
      icon: 'grid',
      color: '#E8F7EE',
      iconColor: '#0B7A3E',
    },

    {
      title: 'Available Plots',
      value:
        stats?.availablePlots || 0,
      subtitle: 'Ready for sale',
      icon: 'checkmark-circle',
      color: '#EAF8EC',
      iconColor: '#0F9D58',
    },

    {
      title: 'Booked Plots',
      value:
        stats?.bookedPlots || 0,
      subtitle: 'Under booking',
      icon: 'shield-checkmark',
      color: '#FFF3E7',
      iconColor: '#FF9800',
    },

    {
      title: 'Sold Plots',
      value: stats?.soldPlots || 0,
      subtitle:
        'Successfully sold',
      icon: 'document-text',
      color: '#FFECEC',
      iconColor: '#F44336',
    },
  ];


  return (
    <View
      style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.headerRight}>

          <TouchableOpacity
            style={
              styles.notificationContainer
            }>

            <Icon
              name="notifications-outline"
              size={scale(24)}
              color="#111"
            />

            {/* <View style={styles.badge}>
              <Text style={styles.badgeText}>
                3
              </Text>
            </View> */}

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.openDrawer()}>

            <Icon
              name="menu"
              size={scale(24)}
              color="#111"
            />

          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        data={enquiries}
        keyExtractor={(
          item: EnquiryType,
        ) => item._id}

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={{
          paddingBottom:
            verticalScale(120),
        }}

        ListHeaderComponent={
          <>
            {/* BANNER */}
            <LinearGradient
              colors={[
                '#0B7A3E',
                '#0F9D58',
              ]}
              style={styles.banner}>

              <View style={styles.bannerContent}>

                <Text
                  style={
                    styles.bannerTitle
                  }>
                  Welcome back,
                  Admin! 👋
                </Text>

                <Text
                  style={
                    styles.bannerSubtitle
                  }>
                  Here’s what’s happening
                  with your property
                  inventory.
                </Text>

              </View>

              <Image
                source={require('../assets/images/banner.png')}
                style={
                  styles.bannerImage
                }
                resizeMode="contain"
              />

            </LinearGradient>


            {/* STATS */}
            <View
              style={
                styles.statsContainer
              }>

              {statCards.map(
                (
                  item,
                  index,
                ) => (
                  <StatCard
                    key={index}
                    item={item}
                  />
                ),
              )}

            </View>


            {/* SECTION */}
            <View
              style={
                styles.sectionHeader
              }>

              <Text
                style={
                  styles.sectionTitle
                }>
                Recent Enquiries
              </Text>

              <TouchableOpacity>

                <Text
                  style={
                    styles.viewAll
                  }>
                  View All
                </Text>

              </TouchableOpacity>

            </View>
          </>
        }

        renderItem={({
          item,
        }: {
          item: EnquiryType;
        }) => (
          <EnquiryCard item={item} />
        )}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />


      {/* FAB */}
      <FloatingButton
        onPress={() =>
          navigation.navigate(
            'AddPlot',
          )
        }
      />

    </View>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  logo: {
    width: scale(130),
    height: verticalScale(45),
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationContainer: {
    position: 'relative',
    marginRight: scale(16),
  },

  badge: {
    position: 'absolute',
    top: verticalScale(-4),
    right: scale(-4),
    backgroundColor: 'red',
    width: scale(18),
    height: scale(18),
    borderRadius: moderateScale(9),
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontSize: fontScale(10),
    fontWeight: '700',
  },

  banner: {
    marginTop: verticalScale(20),
    borderRadius: moderateScale(20),
    padding: moderateScale(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    elevation: 5,
  },

  bannerContent: {
    flex: 1,
    paddingRight: scale(10),
  },

  bannerTitle: {
    color: '#fff',
    fontSize: fontScale(20),
    fontWeight: '700',
  },

  bannerSubtitle: {
    color: '#E7F6EC',
    marginTop: verticalScale(10),
    lineHeight: verticalScale(20),
    fontSize: fontScale(12),
  },

  bannerImage: {
    width: width * 0.30,
    height: width * 0.24,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:
      'space-between',
    marginTop: verticalScale(20),
  },

  sectionHeader: {
    marginTop: verticalScale(25),
    marginBottom: verticalScale(15),
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: '#111',
  },

  viewAll: {
    color: '#0B7A3E',
    fontWeight: '700',
    fontSize: fontScale(13),
  },

});
