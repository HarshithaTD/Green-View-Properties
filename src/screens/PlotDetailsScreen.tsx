// // src/screens/PlotDetailsScreen.tsx

import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Share,
  Alert,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

 import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addToFavorite,
  removeFromFavorite,
} from '../redux/slices/favoriteSlice';

import {
  fetchSinglePlot,
  Plot,
} from '../redux/slices/plotSlice';

import {
  AppDispatch,
  RootState,
} from '../redux/store';


import InfoCard from '../components/InfoCard';
import AmenityCard from '../components/AmenityCard';
import CustomButton from '../components/CustomButton';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';
import {API_HOST} from '../services/apiConfig';
import {useAddToCartMutation} from '../services/cartApi';


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

  const [addToCart, {isLoading: cartLoading}] =
  useAddToCartMutation();

const userId = useSelector(
  (state: RootState) =>
    state.user.user?._id,
);

  const route =
    useRoute<PlotDetailsRouteProp>();

    const dispatch =
      useDispatch<AppDispatch>();

  const {plot} = route.params;
  const plotId = plot._id || plot.id;

  const {plots, singlePlot} =
    useSelector(
      (state: RootState) =>
        state.plots,
    );

  const storePlot = plots.find(
    item =>
      (item._id || (item as any).id) ===
      plotId,
  );

  const currentPlot: Plot | any =
    (singlePlot &&
      (singlePlot._id ||
        (singlePlot as any).id) === plotId
      ? singlePlot
      : null) ||
    storePlot ||
    plot;

  useEffect(() => {
    if (plotId) {
      dispatch(fetchSinglePlot(plotId));
    }
  }, [dispatch, plotId]);

  const imageSource = currentPlot.image
    ? typeof currentPlot.image === 'string'
      ? {
          uri: currentPlot.image.startsWith('http')
            ? currentPlot.image
            : `${API_HOST}/${currentPlot.image}`,
        }
      : currentPlot.image
    : require('../assets/images/plots/plot1.png');

  const amenities = Array.isArray(
    currentPlot.amenities,
  )
    ? currentPlot.amenities.map(
        (item: any) => ({
          ...item,
          distance:
            item.distance ||
            item.value ||
            'N/A',
        }),
      )
    : [
        {
          title: 'Park',
          distance:
            currentPlot.amenities
              ?.parkDistance ||
            'N/A',
          icon: 'map',
        },
        {
          title: 'School',
          distance:
            currentPlot.amenities
              ?.schoolDistance ||
            'N/A',
          icon: 'book-open',
        },
        {
          title: 'Hospital',
          distance:
            currentPlot.amenities
              ?.hospitalDistance || 'N/A',
          icon: 'plus-square',
        },
        {
          title: 'Market',
          distance:
            currentPlot.amenities
              ?.marketDistance ||
            'N/A',
          icon: 'shopping-cart',
        },
      ];

  // const [favorite, setFavorite] =
  //   useState(false);


  const favoritePlots = useSelector(
    (state: RootState) =>
      state.favorites.favoritePlots,
  );


  const isFavorite =
    favoritePlots.some(
      item =>
        (item._id || item.id) ===
        plotId,
    );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(
        removeFromFavorite(plotId),
      );
    } else {
      dispatch(addToFavorite(currentPlot));
    }
  };


  const onShare = async () => {
    try {
      await Share.share({
        message: `${currentPlot.title} - ${currentPlot.price}`,
      });
    } catch (error) {}
  };

  
const handleAddToCart = async () => {
  try {
    if (!userId) {
      Alert.alert(
        'Login Required',
        'Please login first',
      );
      return;
    }

    await addToCart({
      userId,
      plotId,
    }).unwrap();

    Alert.alert(
      'Success',
      'Plot added to cart successfully',
      [
        {
          text: 'Go To Cart',
          onPress: () =>
            navigation.navigate('Cart'),
        },
        {
          text: 'Continue',
          style: 'cancel',
        },
      ],
    );
  } catch (error: any) {
    const message =
      error?.data?.message ||
      'Plot already exists in cart';

    if (
      error?.status === 409 ||
      message
        .toLowerCase()
        .includes('already')
    ) {
      Alert.alert(
        'Already Added',
        'This plot is already in your cart.',
        [
          {
            text: 'Go To Cart',
            onPress: () =>
              navigation.navigate('Cart'),
          },
          {
            text: 'Continue',
            style: 'cancel',
          },
        ],
      );
      return;
    }

    Alert.alert('Info', message);
  }
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
            onPress={toggleFavorite}>
            <Feather
              name="heart"
              size={scale(22)}
              color={
                isFavorite ? 'red' : '#000'
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
            source={imageSource}
            style={styles.plotImage}
          />

          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>
              1/1
            </Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.plotTitle}>
            {currentPlot.title}
          </Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {currentPlot.status}
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
            {currentPlot.location},{' '}
            {currentPlot.sector}
          </Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoRow}>
          <InfoCard
            title="Plot Area"
            value={currentPlot.size}
          />

          <InfoCard
            title="Price"
            value={currentPlot.price}
          />

          <InfoCard
            title="Facing"
            value={currentPlot.facing}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            About Plot
          </Text>

          <Text style={styles.description}>
            {currentPlot.description}
          </Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Nearby Amenities
          </Text>

          <FlatList
            horizontal
            data={amenities}
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
  <View style={styles.buttonWrapper}>
    <CustomButton
      title="Enquire Now"
      outlined
      onPress={() =>
        navigation.navigate(
          'Enquiry',
          {
            plot: currentPlot,
          },
        )
      }
    />
  </View>

  <View style={styles.buttonWrapper}>
    <CustomButton
      title={
        cartLoading
          ? 'Adding...'
          : 'Add To Cart'
      }
      onPress={handleAddToCart}
    />
  </View>
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
  buttonWrapper: {
  flex: 1,
  marginHorizontal: scale(6),
},
});







