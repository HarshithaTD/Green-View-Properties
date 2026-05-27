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
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppDispatch,
  RootState,
} from '../../redux/store';

import { fetchPlots } from '../../redux/slices/plotSlice';
import socket from '../../services/socket';


import StatusTabs from '../../components/admin/StatusTabs';
import PlotCard from '../../components/admin/PlotCard';
import FloatingButton from '../../components/admin/FloatingButton';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/admin/Header';

const tabs = [
  'All',
  'Available',
  'Booked',
  'Sold',
];

const PlotsScreen = ({
  navigation,
}: any) => {
  const dispatch =
    useDispatch<AppDispatch>();

const {
  plots = [],
  loading,
} = useSelector(
  (state: RootState) =>
    state.plots,
);

  const [selectedTab, setSelectedTab] =
    useState('All');

  const [search, setSearch] =
    useState('');

  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {
    dispatch(fetchPlots());

    const reloadPlots = () => {
      dispatch(fetchPlots());
    };

    socket.on('plot:created', reloadPlots);
    socket.on('plot:updated', reloadPlots);
    socket.on('plot:status', reloadPlots);
    socket.on('plot:deleted', reloadPlots);
    socket.on('plots:changed', reloadPlots);

    return () => {
      socket.off('plot:created', reloadPlots);
      socket.off('plot:updated', reloadPlots);
      socket.off('plot:status', reloadPlots);
      socket.off('plot:deleted', reloadPlots);
      socket.off('plots:changed', reloadPlots);
    };
  }, [dispatch]);

  const onRefresh =
    useCallback(async () => {
      setRefreshing(true);

      await dispatch(fetchPlots());

      setRefreshing(false);
    }, [dispatch]);

  const filteredPlots = plots.filter(
    (plot: any) => {
      const matchStatus =
        selectedTab === 'All'
          ? true
          : plot.status ===
          selectedTab;

      const matchSearch =
        plot.location
          ?.toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||
        plot.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase(),
          );

      return (
        matchStatus &&
        matchSearch
      );
    },
  );

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#0B5D1E"
        barStyle="light-content"
      />

      {/* HEADER */}
   <Header
  navigation={navigation}
  title="Plots"
  notificationCount={5}
/>


      {/* SEARCH */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      {/* STATUS TABS */}
     
<StatusTabs
  tabs={tabs}
  selectedTab={selectedTab}
  onSelect={setSelectedTab}
/>

      {/* LIST */}
      {loading ? (
        <View
          style={styles.loader}>
          <ActivityIndicator
            size="large"
            color="#0B5D1E"
          />
        </View>
      ) : (
        <FlatList
          data={filteredPlots}
          keyExtractor={(item: any) =>
            item._id
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.listContainer
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[
                '#0B5D1E',
              ]}
            />
          }
          ListEmptyComponent={() => (
            <View
              style={
                styles.emptyContainer
              }>
              <Icon
                name="cube-outline"
                size={moderateScale(
                  70,
                )}
                color="#BDBDBD"
              />

              <Text
                style={
                  styles.emptyText
                }>
                No Plots Found
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <PlotCard
              plot={item}
              navigation={
                navigation
              }
            />
          )}
        />
      )}

      {/* FAB */}
      <FloatingButton
        onPress={() =>
          navigation.navigate(
            'AddPlot',
          )
        }
      />
    </SafeAreaView>
  );
};

export default PlotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal:
      scale(16),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContainer: {
    paddingBottom:
      verticalScale(120),
    paddingTop:
      verticalScale(8),
  },

  emptyContainer: {
    marginTop:
      verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    marginTop:
      verticalScale(14),
    fontSize: fontScale(16),
    color: '#777777',
    fontWeight: '600',
  },
});
