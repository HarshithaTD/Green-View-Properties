import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  useDispatch,
} from 'react-redux';

import {
  AppDispatch,
} from '../../redux/store';

import {
  deletePlot,
  updatePlotStatus,
} from '../../redux/slices/plotSlice';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';
import {API_HOST} from '../../services/apiConfig';

interface PlotCardProps {
  plot: any;
  navigation: any;
}

const PlotCard = ({
  plot,
  navigation,
}: PlotCardProps) => {
  const dispatch =
    useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(
        deletePlot(plot._id),
      ).unwrap();

      Alert.alert(
        'Success',
        'Plot Deleted',
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Delete Failed',
      );
    }
  };

  const handleStatusChange =
    async () => {
      const nextStatus =
        plot.status ===
        'Available'
          ? 'Booked'
          : plot.status ===
            'Booked'
          ? 'Sold'
          : 'Available';

      try {
        await dispatch(
          updatePlotStatus({
            id: plot._id,
            status: nextStatus,
          }),
        ).unwrap();

        Alert.alert(
          'Success',
          `Status Changed to ${nextStatus}`,
        );
      } catch (error) {
        Alert.alert(
          'Error',
          'Status Update Failed',
        );
      }
    };

  const statusColor =
    plot.status ===
    'Available'
      ? '#DFF5E1'
      : plot.status ===
        'Booked'
      ? '#FFE8D6'
      : '#FFD6D6';

  const statusTextColor =
    plot.status ===
    'Available'
      ? '#1B8A3D'
      : plot.status ===
        'Booked'
      ? '#E67E22'
      : '#D63031';

  return (
    <View style={styles.card}>
      {/* IMAGE */}
      <Image
        source={{
          uri: plot.image
            ? `${API_HOST}/${plot.image}`
            : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* CONTENT */}
      <View style={styles.content}>

        {/* TOP ROW */}
        <View style={styles.topRow}>
          <Text
            numberOfLines={1}
            style={styles.plotId}>
            {plot.title}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  statusColor,
              },
            ]}
            onPress={
              handleStatusChange
            }>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    statusTextColor,
                },
              ]}>
              {plot.status}
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOCATION */}
        <View
          style={
            styles.infoRow
          }>
          <Icon
            name="location-outline"
            size={moderateScale(
              15,
            )}
            color="#666"
          />

          <Text
            numberOfLines={1}
            style={
              styles.location
            }>
            {plot.location ||
              'No Location'}
            ,{' '}
            {plot.sector ||
              'No Sector'}
          </Text>
        </View>

        {/* SIZE */}
        <View
          style={
            styles.infoRow
          }>
          <Icon
            name="resize-outline"
            size={moderateScale(
              15,
            )}
            color="#666"
          />

          <Text
            style={styles.size}>
            {plot.size}
          </Text>
        </View>

        {/* PRICE */}
        <Text style={styles.price}>
          ₹ {plot.price}
        </Text>

        {/* ACTIONS */}
        <View style={styles.actions}>

          {/* VIEW */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={
              styles.eyeBtn
            }
            onPress={() =>
              navigation.navigate(
                'PlotDetails',
                { plot },
              )
            }>
            <Icon
              name="eye-outline"
              size={moderateScale(
                18,
              )}
              color="#0B5D1E"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.editBtn}
            onPress={() =>
              navigation.navigate(
                'AddPlot',
                {plot},
              )
            }>
            <Icon
              name="create-outline"
              size={moderateScale(
                18,
              )}
              color="#2563EB"
            />
          </TouchableOpacity>

          {/* DELETE */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={
              styles.deleteBtn
            }
            onPress={
              handleDelete
            }>
            <Icon
              name="trash-outline"
              size={moderateScale(
                18,
              )}
              color="#E53935"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(PlotCard);

const CARD_RADIUS =
  moderateScale(18);

const IMAGE_SIZE =
  scale(105);

const ACTION_SIZE =
  scale(42);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    backgroundColor:
      '#FFFFFF',

    marginTop:
      verticalScale(16),

    borderRadius:
      CARD_RADIUS,

    padding:
      moderateScale(12),

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 4,
  },

  image: {
    width: IMAGE_SIZE,

    height: IMAGE_SIZE,

    borderRadius:
      moderateScale(14),
  },

  content: {
    flex: 1,

    marginLeft:
      scale(12),

    justifyContent:
      'space-between',
  },

  topRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  plotId: {
    flex: 1,

    fontSize:
      fontScale(16),

    fontWeight: '700',

    color: '#111111',

    marginRight:
      scale(10),
  },

  statusBadge: {
    paddingHorizontal:
      scale(10),

    paddingVertical:
      verticalScale(4),

    borderRadius:
      moderateScale(10),
  },

  statusText: {
    fontSize:
      fontScale(11),

    fontWeight: '700',
  },

  infoRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop:
      verticalScale(6),
  },

  location: {
    marginLeft:
      scale(5),

    color: '#555',

    flex: 1,

    fontSize:
      fontScale(12),
  },

  size: {
    marginLeft:
      scale(5),

    color: '#666',

    fontSize:
      fontScale(12),
  },

  price: {
    marginTop:
      verticalScale(8),

    fontSize:
      fontScale(18),

    fontWeight: '700',

    color: '#0B5D1E',
  },

  actions: {
    flexDirection: 'row',

    marginTop:
      verticalScale(12),
  },

  eyeBtn: {
    width: ACTION_SIZE,

    height: ACTION_SIZE,

    borderRadius:
      moderateScale(12),

    borderWidth: 1,

    borderColor:
      '#0B5D1E',

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      scale(10),
  },

  editBtn: {
    width: ACTION_SIZE,

    height: ACTION_SIZE,

    borderRadius:
      moderateScale(12),

    borderWidth: 1,

    borderColor:
      '#2563EB',

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      scale(10),
  },

  deleteBtn: {
    width: ACTION_SIZE,

    height: ACTION_SIZE,

    borderRadius:
      moderateScale(12),

    borderWidth: 1,

    borderColor:
      '#E53935',

    justifyContent:
      'center',

    alignItems:
      'center',
  },
});
