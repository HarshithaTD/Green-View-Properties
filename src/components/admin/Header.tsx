import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';

interface HeaderProps {
  navigation: any;
  title: string;

  showNotification?: boolean;
  notificationCount?: number;

  onNotificationPress?: () => void;
}

const Header = ({
  navigation,
  title,
  showNotification = true,
  notificationCount = 0,
  onNotificationPress,
}: HeaderProps) => {
  return (
    <View style={styles.header}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.goBack()
        }>
        <Icon
          name="arrow-back"
          size={moderateScale(26)}
          color="#111111"
        />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>
        {title}
      </Text>

      {/* NOTIFICATION */}
      {showNotification ? (
        <TouchableOpacity
          style={
            styles.bellContainer
          }
          activeOpacity={0.7}
          onPress={
            onNotificationPress
          }>
          <Icon
            name="notifications-outline"
            size={moderateScale(24)}
            color="#000"
          />

          {notificationCount >
            0 && (
            <View
              style={styles.badge}>
              <Text
                style={
                  styles.badgeText
                }>
                {notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: scale(24),
          }}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginTop:
      verticalScale(10),

    marginBottom:
      verticalScale(8),
  },

  title: {
    fontSize:
      fontScale(22),

    fontWeight: '700',

    color: '#111111',
  },

  bellContainer: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',

    right: scale(-4),

    top: verticalScale(-4),

    minWidth: scale(18),

    height: scale(18),

    borderRadius: scale(9),

    backgroundColor:
      '#FF3B30',

    justifyContent:
      'center',

    alignItems: 'center',

    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#FFFFFF',

    fontSize:
      fontScale(9),

    fontWeight: '700',
  },
});