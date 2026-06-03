// src/components/admin/SidebarDrawer.tsx

import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  screenWidth,
  screenHeight,
} from '../../utils/responsive';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  screen: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: 'home',
    screen: 'AdminDashboard',
  },

  {
    id: '2',
    title: 'Plots List',
    icon: 'grid',
    screen: 'PlotsList',
  },

  {
    id: '3',
    title: 'Add Plot',
    icon: 'plus-circle',
    screen: 'AddPlot',
  },

  // {
  //   id: '4',
  //   title: 'Bookings',
  //   icon: 'calendar',
  //   screen: 'Bookings',
  // },

  {
    id: '5',
    title: 'Enquiries',
    icon: 'message-square',
    screen: 'Enquiries',

  },

  // {
  //   id: '6',
  //   title: 'Users',
  //   icon: 'users',
  //   screen: 'Users',
  // },

  // {
  //   id: '7',
  //   title: 'Settings',
  //   icon: 'settings',
  //   screen: 'Settings',
  // },

  // {
  //   id: '8',
  //   title: 'Reports',
  //   icon: 'file-text',
  //   screen: 'Reports',
  // },
];

const SidebarDrawer = ({ navigation }: any) => {
  const [activeItem, setActiveItem] =
    useState('Dashboard');

  

  const renderItem = ({
    item,
  }: {
    item: MenuItem;
  }) => {
    const isActive =
      activeItem === item.title;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setActiveItem(item.title);

          navigation.navigate(
            item.screen,
          );

          navigation.closeDrawer();
        }}
        style={
          styles.menuButtonContainer
        }>
        {isActive ? (
          <LinearGradient
            colors={[
              '#35ce6d',
              '#52be79',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={
              styles.activeMenuButton
            }>
            <Feather
              name={item.icon}
              size={moderateScale(18)}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.activeMenuText
              }>
              {item.title}
            </Text>

            {item.badge && (
              <View
                style={
                  styles.activeBadge
                }>
                <Text
                  style={
                    styles.activeBadgeText
                  }>
                  {item.badge}
                </Text>
              </View>
            )}
          </LinearGradient>
        ) : (
          <View style={styles.menuButton}>
            <Feather
              name={item.icon}
              size={moderateScale(18)}
              color="#111111"
            />

            <Text style={styles.menuText}>
              {item.title}
            </Text>

            {item.badge && (
              <View style={styles.badge}>
                <Text
                  style={
                    styles.badgeText
                  }>
                  {item.badge}
                </Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}>
      <View style={styles.sidebar}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* DIVIDER */}
          <View style={styles.divider} />
        </View>

        {/* MENU */}
        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.menuList
          }
        />

        {/* LOGOUT */}
        {/* LOGOUT */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Logout',
                  style: 'destructive',
                  onPress: () => {
                    navigation.closeDrawer();

                    navigation.replace(
                      'Login',
                    );
                  },
                },
              ],
            );
          }}>
          <Feather
            name="log-out"
            size={moderateScale(18)}
            color="#EF4444"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SidebarDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  sidebar: {
    width: screenWidth * 0.75,
    height: screenHeight,

    backgroundColor: '#F8FDFB',

    borderTopRightRadius:
      moderateScale(24),

    borderBottomRightRadius:
      moderateScale(24),

    paddingHorizontal: scale(18),

    paddingTop: verticalScale(10),

    paddingBottom:
      verticalScale(20),

    shadowColor: '#000',

    shadowOffset: {
      width: 4,
      height: 4,
    },

    shadowOpacity: 0.15,

    shadowRadius: 10,

    elevation: 10,
  },

  header: {
    marginBottom: verticalScale(25),

    alignItems: 'center',
  },

  logoImage: {
    width: scale(160),
    height: verticalScale(70),
  },

  divider: {
    width: '100%',
    height: 1,

    backgroundColor: '#89D8A5',

    marginTop: verticalScale(10),
  },

  menuList: {
    paddingTop: verticalScale(10),
  },

  menuButtonContainer: {
    marginBottom: verticalScale(10),
  },

  activeMenuButton: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical:
      verticalScale(14),

    paddingHorizontal: scale(16),

    borderRadius:
      moderateScale(16),
  },

  activeMenuText: {
    color: '#FFFFFF',

    fontSize: fontScale(15),

    fontWeight: '600',

    marginLeft: scale(14),

    flex: 1,
  },

  menuButton: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical:
      verticalScale(14),

    paddingHorizontal: scale(16),

    borderRadius:
      moderateScale(16),
  },

  menuText: {
    color: '#111111',

    fontSize: fontScale(15),

    fontWeight: '500',

    marginLeft: scale(14),

    flex: 1,
  },

  badge: {
    backgroundColor: '#DCFCE7',

    minWidth: scale(26),

    height: scale(26),

    borderRadius:
      moderateScale(13),

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: scale(6),
  },

  badgeText: {
    color: '#15803D',

    fontWeight: '700',

    fontSize: fontScale(11),
  },

  activeBadge: {
    backgroundColor:
      'rgba(255,255,255,0.25)',

    minWidth: scale(26),

    height: scale(26),

    borderRadius:
      moderateScale(13),

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: scale(6),
  },

  activeBadgeText: {
    color: '#FFFFFF',

    fontWeight: '700',

    fontSize: fontScale(11),
  },

  logoutButton: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: scale(16),

    paddingVertical:
      verticalScale(14),

    marginTop: 'auto',

    borderTopWidth: 1,

    borderTopColor: '#EEEEEE',
  },

  logoutText: {
    color: '#EF4444',

    fontSize: fontScale(15),

    fontWeight: '600',

    marginLeft: scale(14),
  },
});