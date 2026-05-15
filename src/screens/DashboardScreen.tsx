import React, {useState} from 'react';

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

import SearchBar from '../components/SearchBar';
import PlotCard from '../components/PlotCard';
import BottomTab from '../components/BottomTab';
import {plotsData} from '../data/plotsData';
import Header from '../components/Header';
import PriceFilter from '../components/PriceFilter';

export default function DashboardScreen() {
  // FILTERED DATA STATE
  const [filteredPlots, setFilteredPlots] =
    useState(plotsData);

const [searchText, setSearchText] =
  useState('');

const handleSearch = (text: string) => {
  setSearchText(text);

  // If search empty
  if (text.trim() === '') {
    setFilteredPlots(plotsData);
    return;
  }

  // Filter plots
  const filtered = plotsData.filter(
    plot => {
      const search =
        text.toLowerCase();

      return (
        plot.title
          .toLowerCase()
          .includes(search) ||

        plot.location
          .toLowerCase()
          .includes(search) ||

        plot.sector
          .toLowerCase()
          .includes(search) ||

        plot.price
          .toLowerCase()
          .includes(search)
      );
    },
  );

  setFilteredPlots(filtered);
};

  // APPLY FILTER
  const applyPriceFilter = (
    min: number,
    max: number,
  ) => {
    const filtered = plotsData
      .filter(plot => {
        // REMOVE ₹ AND COMMAS
        const price = Number(
          plot.price.replace(/₹|,/g, ''),
        );

        return (
          price >= min &&
          price <= max
        );
      })

      // SORT LOW TO HIGH
      .sort((a, b) => {
        const priceA = Number(
          a.price.replace(/₹|,/g, ''),
        );

        const priceB = Number(
          b.price.replace(/₹|,/g, ''),
        );

        return priceA - priceB;
      });

    setFilteredPlots(filtered);
  };

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
        keyExtractor={item => item.id}
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
        renderItem={({item}) => (
          <PlotCard item={item} />
        )}
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
