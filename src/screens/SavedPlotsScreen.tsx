import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  useNavigation,
} from '@react-navigation/native';

import {RootState} from '../redux/store';

import {removeFromFavorite} from '../redux/slices/favoriteSlice';

const SavedPlotsScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

  const savedPlots = useSelector(
    (state: RootState) =>
      state.favorites.favoritePlots,
  );

  console.log(
    'Saved Plots:',
    savedPlots,
  );

  const renderItem = ({
    item,
  }: any) => (
    <View style={styles.card}>
      <Image
        source={
          typeof item.image ===
          'string'
            ? {uri: item.image}
            : item.image
        }
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.sector}>
          {item.sector}
        </Text>

        <Text style={styles.info}>
          {item.size} | {item.price}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          dispatch(
            removeFromFavorite(
              item._id || item.id,
            ),
          )
        }>
        <Feather
          name="heart"
          size={22}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={styles.backButton}>
          <Feather
            name="arrow-left"
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Saved Plots
        </Text>

        {/* Empty View */}
        <View style={{width: 24}} />
      </View>

      <FlatList
        data={savedPlots}
        keyExtractor={(
          item,
          index,
        ) =>
          (
            item._id ||
            item.id ||
            index
          ).toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <View
            style={
              styles.emptyContainer
            }>
            <Feather
              name="heart"
              size={60}
              color="#ccc"
            />

            <Text
              style={
                styles.emptyText
              }>
              No Saved Plots
            </Text>

            <Text
              style={
                styles.emptySubText
              }>
              Save plots from the
              plot details screen.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default SavedPlotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  /* Header */
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },

  backButton: {
    width: 24,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  /* Card */
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 3,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  sector: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },

  info: {
    marginTop: 6,
    fontWeight: '600',
    color: '#222',
    fontSize: 14,
  },

  /* Empty State */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: 14,
  },

  emptySubText: {
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 30,
  },
});