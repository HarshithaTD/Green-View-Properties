// src/screens/ProfileScreen.tsx

import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
 
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../redux/store';

import {
  updateProfile
  
} from '../redux/slices/userSlice';

import ActivityMenuItem from '../components/ActivityMenuItem';

import BottomTab from '../components/BottomTab';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';
import EditProfileModal from '../components/EditProfileModel';

export default function ProfileScreen({
  navigation,
}: any) {
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.user.user,
  );

  const [visible, setVisible] =
    useState(false);

  const initials = user?.name
    ?.split(' ')
    ?.map((i: string) => i[0])
    ?.join('');

  const onSave = (data: any) => {
    dispatch(updateProfile(data));

    setVisible(false);
  };

  const onLogout = async () => {
  Alert.alert(
    'Logout',
    'Are you sure?',
    [
      {
        text: 'Cancel',
      },
      {
        text: 'Logout',

        onPress: async () => {
          try {
            // Firebase Logout
            await auth().signOut();

            // Navigate to Login
            navigation.replace('Login');

          } catch (error) {
            console.log(error);
          }
        },
      },
    ],
  );
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View />

        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <TouchableOpacity>
          <Feather
            name="settings"
            size={scale(22)}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {initials}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {user?.name}
          </Text>

          <Text style={styles.info}>
            {user?.phone}
          </Text>

          <Text style={styles.info}>
            {user?.email}
          </Text>

          <TouchableOpacity
            onPress={() => setVisible(true)}>
            <Text style={styles.editText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <Feather
          name="chevron-right"
          size={scale(20)}
          color="#999"
        />
      </View>

      {/* Activity */}
      <Text style={styles.sectionTitle}>
        My Activity
      </Text>

      <View style={styles.menuCard}>
        <ActivityMenuItem
          icon="file-text"
          title="My Enquiries"
          onPress={() =>
            navigation.navigate('Enquiry')
          }
        />

        {/* <ActivityMenuItem
          icon="calendar"
          title="My Bookings"
          onPress={() =>
            navigation.navigate('Booking')
          }
        /> */}

        <ActivityMenuItem
          icon="heart"
          title="Saved Plots"
          onPress={() => {}}
        />

        <ActivityMenuItem
          icon="bell"
          title="Notifications"
          badge={3}
          onPress={() => {}}
        />

        <ActivityMenuItem
          icon="settings"
          title="Settings"
          onPress={() => {}}
        />

        <ActivityMenuItem
          icon="help-circle"
          title="Help & Support"
          onPress={() => {}}
        />

        <ActivityMenuItem
          icon="log-out"
          title="Logout"
          danger
          onPress={onLogout}
        />
      </View>

      {/* Modal */}
      <EditProfileModal
        visible={visible}
        onClose={() => setVisible(false)}
        user={user}
        onSave={onSave}
      />

      {/* Bottom Tab */}
      <View style={styles.bottomTab}>
        <BottomTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',

    paddingHorizontal: scale(18),
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginTop: verticalScale(15),
  },

  headerTitle: {
    fontSize: fontScale(20),

    fontWeight: '700',
  },

  profileCard: {
    marginTop: verticalScale(25),

    backgroundColor: '#F9F9F9',

    borderRadius: moderateScale(18),

    padding: scale(16),

    flexDirection: 'row',

    alignItems: 'center',
  },

  avatar: {
    width: scale(54),

    height: scale(54),

    borderRadius: moderateScale(27),

    backgroundColor: '#7186A0',

    justifyContent: 'center',

    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',

    fontWeight: '700',

    fontSize: fontScale(18),
  },

  userInfo: {
    flex: 1,

    marginLeft: scale(14),
  },

  name: {
    fontSize: fontScale(15),

    fontWeight: '700',
  },

  info: {
    marginTop: verticalScale(3),

    color: '#777',

    fontSize: fontScale(12),
  },

  editText: {
    marginTop: verticalScale(8),

    color: '#0F9D58',

    fontWeight: '700',
  },

  sectionTitle: {
    marginTop: verticalScale(28),

    marginBottom: verticalScale(14),

    fontWeight: '700',

    fontSize: fontScale(16),
  },

  menuCard: {
    backgroundColor: '#fff',

    borderRadius: moderateScale(16),

    paddingHorizontal: scale(14),

    borderWidth: 1,

    borderColor: '#F1F1F1',
  },

  bottomTab: {
    position: 'absolute',

    bottom: 0,

    left: 0,

    right: 0,
  },
});