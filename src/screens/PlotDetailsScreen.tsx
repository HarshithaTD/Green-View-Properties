// src/screens/PlotDetailsScreen.tsx

import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Share,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import InfoCard from '../components/InfoCard';
import AmenityCard from '../components/AmenityCard';
import CustomButton from '../components/CustomButton';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

type RootStackParamList = {
  PlotDetails: {
    plot: any;
  };
};

type PlotDetailsRouteProp = RouteProp<
  RootStackParamList,
  'PlotDetails'
>;

const PlotDetailsScreen = () => {
  const navigation = useNavigation<any>();

  const route =
    useRoute<PlotDetailsRouteProp>();

  const {plot} = route.params;

  const [favorite, setFavorite] =
    useState(false);

  const onShare = async () => {
    try {
      await Share.share({
        message: `${plot.title} - ${plot.price}`,
      });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.goBack()
          }>
          <Feather
            name="arrow-left"
            size={scale(24)}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Plot Details
        </Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              setFavorite(!favorite)
            }>
            <Feather
              name="heart"
              size={scale(22)}
              color={
                favorite ? 'red' : '#000'
              }
              style={{
                marginRight: scale(16),
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onShare}>
            <Feather
              name="share-2"
              size={scale(22)}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: verticalScale(120),
        }}>
        {/* Plot Image */}
        <View style={styles.imageContainer}>
          <Image
            source={plot.image}
            style={styles.plotImage}
          />

          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>
              1/6
            </Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.plotTitle}>
            {plot.title}
          </Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {plot.status}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Feather
            name="map-pin"
            size={scale(15)}
            color="#0F9D58"
          />

          <Text style={styles.locationText}>
            {plot.location},{' '}
            {plot.sector}
          </Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoRow}>
          <InfoCard
            title="Plot Area"
            value={plot.size}
          />

          <InfoCard
            title="Price"
            value={plot.price}
          />

          <InfoCard
            title="Facing"
            value={plot.facing}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            About Plot
          </Text>

          <Text style={styles.description}>
            {plot.description}
          </Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Nearby Amenities
          </Text>

          <FlatList
            horizontal
            data={plot.amenities}
            keyExtractor={(
              item,
              index,
            ) => index.toString()}
            showsHorizontalScrollIndicator={
              false
            }
            renderItem={({item}) => (
              <AmenityCard item={item} />
            )}
          />
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <CustomButton
          title="Enquire Now"
          outlined
          onPress={() =>
            navigation.navigate(
              'Enquiry',
              {
                plot: plot,
              },
            )
          }
        />

        {/* <CustomButton
          title="Book Now"
          onPress={() =>
            navigation.navigate('Booking')
          }
        /> */}
      </View>
    </View>
  );
};

export default PlotDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    paddingHorizontal: scale(18),

    paddingVertical: verticalScale(18),
  },

  headerTitle: {
    fontSize: fontScale(18),

    fontWeight: '700',

    color: '#000',
  },

  headerIcons: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  imageContainer: {
    marginHorizontal: scale(18),

    position: 'relative',
  },

  plotImage: {
    width: '100%',

    height: verticalScale(210),

    borderRadius: moderateScale(18),

    resizeMode: 'cover',
  },

  imageBadge: {
    position: 'absolute',

    bottom: verticalScale(12),

    right: scale(12),

    backgroundColor: '#00000090',

    paddingHorizontal: scale(10),

    paddingVertical: verticalScale(4),

    borderRadius: moderateScale(20),
  },

  imageBadgeText: {
    color: '#fff',

    fontSize: fontScale(12),

    fontWeight: '600',
  },

  titleRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginTop: verticalScale(20),

    paddingHorizontal: scale(18),
  },

  plotTitle: {
    flex: 1,

    fontSize: fontScale(24),

    fontWeight: '700',

    color: '#000',

    marginRight: scale(10),
  },

  statusBadge: {
    backgroundColor: '#E7F6EC',

    paddingHorizontal: scale(12),

    paddingVertical: verticalScale(6),

    borderRadius: moderateScale(8),
  },

  statusText: {
    color: '#0F9D58',

    fontWeight: '700',

    fontSize: fontScale(11),
  },

  locationRow: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: scale(18),

    marginTop: verticalScale(10),
  },

  locationText: {
    marginLeft: scale(6),

    color: '#666',

    fontSize: fontScale(13),

    flex: 1,
  },

  infoRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: scale(18),

    marginTop: verticalScale(20),
  },

  section: {
    paddingHorizontal: scale(18),

    marginTop: verticalScale(28),
  },

  sectionTitle: {
    fontSize: fontScale(18),

    fontWeight: '700',

    color: '#000',

    marginBottom: verticalScale(12),
  },

  description: {
    color: '#555',

    lineHeight: verticalScale(24),

    fontSize: fontScale(14),
  },

  bottomButtons: {
    position: 'absolute',

    bottom: 0,

    left: 0,

    right: 0,

    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: scale(18),

    paddingVertical: verticalScale(18),

    backgroundColor: '#fff',

    borderTopWidth: 1,

    borderColor: '#eee',
  },
});