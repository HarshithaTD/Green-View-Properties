import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../components/SearchBar';
import PlotCard from '../components/PlotCard';
import BottomTab from '../components/BottomTab';
import Header from '../components/Header';
import PriceFilter from '../components/PriceFilter';
import {
  AppDispatch,
  RootState,
} from '../redux/store';
import {
  fetchPlots,
  Plot,
} from '../redux/slices/plotSlice';
import socket from '../services/socket';

const parsePrice = (price: string) =>
  Number(
    String(price || '').replace(
      /[^0-9]/g,
      '',
    ),
  ) || 0;

export default function DashboardScreen() {
  const dispatch =
    useDispatch<AppDispatch>();

  const {plots} = useSelector(
    (state: RootState) => state.plots,
  );

  const [searchText, setSearchText] =
    useState('');

  const [priceRange, setPriceRange] =
    useState<{
      min: number;
      max: number;
    } | null>(null);

  const reloadTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  useEffect(() => {
    dispatch(fetchPlots());

    const reloadPlots = () => {
      if (reloadTimer.current) {
        clearTimeout(
          reloadTimer.current,
        );
      }

      reloadTimer.current = setTimeout(
        () => {
          dispatch(fetchPlots());
        },
        300,
      );
    };

    socket.on('plots:changed', reloadPlots);

    return () => {
      socket.off('plots:changed', reloadPlots);

      if (reloadTimer.current) {
        clearTimeout(
          reloadTimer.current,
        );
      }
    };
  }, [dispatch]);

  const filteredPlots = useMemo(() => {
    const search =
      searchText.trim().toLowerCase();

    const result = plots
      .filter(plot => {
        if (!search) {
          return true;
        }

        return (
          plot.title
            ?.toLowerCase()
            .includes(search) ||
          plot.location
            ?.toLowerCase()
            .includes(search) ||
          plot.sector
            ?.toLowerCase()
            .includes(search) ||
          plot.price
            ?.toLowerCase()
            .includes(search)
        );
      })
      .filter(plot => {
        if (!priceRange) {
          return true;
        }

        const price = parsePrice(
          plot.price,
        );

        return (
          price >= priceRange.min &&
          price <= priceRange.max
        );
      });

    if (!priceRange) {
      return result;
    }

    return [...result].sort(
        (a, b) =>
          parsePrice(a.price) -
          parsePrice(b.price),
      );
  }, [plots, priceRange, searchText]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
    },
    [],
  );

  const applyPriceFilter = (
    min: number,
    max: number,
  ) => {
    setPriceRange({
      min,
      max,
    });
  };

  const renderPlot = useCallback(
    ({item}: {item: Plot}) => (
      <PlotCard item={item} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      <Header />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredPlots}
        keyExtractor={item =>
          item._id || item.title
        }
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        removeClippedSubviews
        contentContainerStyle={
          styles.listContainer
        }
        ListHeaderComponent={
          <>
            {/* Banner */}
            <View style={styles.banner}>
              <View
                style={styles.bannerContent}>
                <Text
                  style={styles.bannerTitle}>
                  Find Your Perfect Plot
                </Text>

                <Text
                  style={
                    styles.bannerSubtitle
                  }>
                  Choose from premium
                  plots in the best
                  locations.
                </Text>
              </View>

              <Image
                source={require('../assets/images/banner.png')}
                style={styles.bannerImage}
              />
            </View>

            {/* Search */}
            <SearchBar
              searchText={searchText}
              onSearch={handleSearch}
            />

            {/* Price Filter */}
            <PriceFilter
              onApplyFilter={
                applyPriceFilter
              }
            />

            {/* Available */}
            <View
              style={styles.availableRow}>
              <Text
                style={
                  styles.availableText
                }>
                {
                  filteredPlots.length
                }{' '}
                Plots Available
              </Text>

              <TouchableOpacity
                style={styles.sortRow}>
                <Text
                  style={styles.sortText}>
                  Sort by:
                </Text>

                <Text
                  style={styles.newest}>
                  Price
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={renderPlot}
      />

      <BottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  banner: {
    marginTop: 18,

    backgroundColor: '#0E8F4B',

    borderRadius: 20,

    paddingVertical: 18,

    paddingHorizontal: 18,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    shadowColor: '#000',

    shadowOpacity: 0.12,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  bannerContent: {
    flex: 1,
    paddingRight: 10,
  },

  bannerTitle: {
    color: '#fff',

    fontSize: 18,

    fontWeight:
      Platform.OS === 'ios'
        ? '700'
        : 'bold',

    lineHeight: 28,
  },

  bannerSubtitle: {
    color: '#EAF8EF',

    fontSize: 12,

    marginTop: 8,

    lineHeight: 20,

    fontWeight: '400',
  },

  bannerImage: {
    top: 10,

    left: 10,

    width: '40%',

    height: 110,

    resizeMode: 'contain',
  },

  availableRow: {
    marginTop: 24,

    marginBottom: 14,

    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  availableText: {
    color: '#0E8F4B',

    fontWeight:
      Platform.OS === 'ios'
        ? '700'
        : 'bold',

    fontSize: 15,
  },

  sortRow: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#fff',

    paddingHorizontal: 12,

    paddingVertical: 8,

    borderRadius: 10,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  sortText: {
    color: '#666',

    fontSize: 12,

    marginRight: 5,
  },

  newest: {
    color: '#000',

    fontWeight:
      Platform.OS === 'ios'
        ? '600'
        : 'bold',

    fontSize: 12,
  },
});
