import React, {memo} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {API_HOST} from '../services/apiConfig';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

interface Props {
  item: any;
  selected: boolean;
  showCheckbox: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({
  item,
  selected,
  showCheckbox,
  onSelect,
  onRemove,
}: Props) => {
  const plot = item?.plotId;

  const imageUri =
    plot?.image?.startsWith('http')
      ? plot.image
      : `${API_HOST}/${plot?.image}`;

  return (
    <View style={styles.card}>
      {showCheckbox && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.checkbox}
          onPress={() => onSelect(item._id)}>
          <Feather
            name={
              selected
                ? 'check-square'
                : 'square'
            }
            size={scale(24)}
            color="#16A34A"
          />
        </TouchableOpacity>
      )}

      {/* Image */}
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.topRow}>
          <Text
            numberOfLines={1}
            style={styles.title}>
            {plot?.title}
          </Text>

          <TouchableOpacity
            onPress={() =>
              onRemove(item._id)
            }>
            <Feather
              name="x"
              size={scale(20)}
              color="#16A34A"
            />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Feather
            name="map-pin"
            size={scale(12)}
            color="#16A34A"
          />

          <Text
            numberOfLines={1}
            style={styles.location}>
            {plot?.location},{' '}
            {plot?.sector}
          </Text>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>
              Plot Area
            </Text>

            <Text style={styles.value}>
              {plot?.size}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.label}>
              Price
            </Text>

            <Text style={styles.value}>
              ₹
              {Number(
                plot?.price || 0,
              ).toLocaleString(
                'en-IN',
              )}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.label}>
              Facing
            </Text>

            <Text style={styles.value}>
              {plot?.facing}
            </Text>
          </View>
        </View>

        {/* Status */}
        <View style={styles.badge}>
          <Text
            style={styles.badgeText}>
            {plot?.status ||
              'Available'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CartItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    backgroundColor: '#FFF',

    borderRadius:
      moderateScale(18),

    marginBottom:
      verticalScale(16),

    padding:
      moderateScale(12),

    borderWidth: 1,

    borderColor: '#EFEFEF',

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  checkbox: {
    justifyContent: 'center',

    marginRight: scale(10),
  },

  image: {
    width: scale(95),

    height: scale(95),

    borderRadius:
      moderateScale(10),

    resizeMode: 'cover',
  },

  content: {
    flex: 1,

    marginLeft: scale(12),

    justifyContent:
      'space-between',
  },

  topRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  title: {
    flex: 1,

    fontWeight: '700',

    fontSize:
      fontScale(15),

    color: '#111827',

    marginRight: scale(8),
  },

  locationRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop:
      verticalScale(6),
  },

  location: {
    marginLeft: scale(4),

    color: '#777',

    fontSize:
      fontScale(12),

    flex: 1,
  },

  infoRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop:
      verticalScale(10),
  },

  infoBlock: {
    flex: 1,
  },

  divider: {
    width: 1,

    height:
      verticalScale(35),

    backgroundColor:
      '#E5E7EB',

    marginHorizontal:
      scale(8),
  },

  label: {
    color: '#6B7280',

    fontSize:
      fontScale(11),
  },

  value: {
    marginTop: 4,

    color: '#111827',

    fontWeight: '700',

    fontSize:
      fontScale(11),
  },

  badge: {
    alignSelf: 'flex-start',

    marginTop:
      verticalScale(10),

    backgroundColor:
      '#E8F7EE',

    paddingHorizontal:
      scale(10),

    paddingVertical:
      verticalScale(4),

    borderRadius:
      moderateScale(20),
  },

  badgeText: {
    color: '#0E8F4B',

    fontSize:
      fontScale(10),

    fontWeight: '700',
  },
});
