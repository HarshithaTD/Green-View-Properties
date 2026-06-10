import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { fetchEnquiries } from '../redux/slices/enquirySlice';
import EnquiryCard from '../components/enquiry/EnquiryCard';
import EmptyState from '../components/enquiry/EmptyState';


const MyEnquiriesScreen = ({ navigation}: any) => {
  const dispatch = useDispatch();

  const {
    enquiries,
    loading,
    count,
  } = useSelector(
    (state: any) =>
      state.enquiries,
  );

  const [status, setStatus] =
    useState('All');

  const [refreshing,
    setRefreshing] =
    useState(false);

  const userId = 'logged-user-id';

  useEffect(() => {
    loadData();
  }, []);

 const loadData =
  async () => {
    await dispatch(
      fetchEnquiries({
        userId,
        search: '',
        status: 'All',
      }) as any,
    );
  };

  const onRefresh =
    async () => {
      setRefreshing(true);

      await loadData();

      setRefreshing(false);
    };

  const filtered =
    useMemo(() => {
      if (
        status === 'All'
      )
        return enquiries;

      return enquiries.filter(
        (item: any) =>
          item.status ===
          status,
      );
    }, [
      enquiries,
      status,
    ]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
      />
    );
  }

  return (
    <View
      style={{ flex: 1 }}>
      <View
        style={{
          flexDirection:
            'row',
          justifyContent:
            'space-between',
          padding: 16,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }>
          <Ionicons
            name="arrow-back"
            size={24}
          />
        </TouchableOpacity>

        <Text>
          My Enquiries
        </Text>

        <Ionicons
          name="filter"
          size={24}
        />
      </View>

      {/* <FilterTabs
        selected={status}
        onSelect={setStatus}
      /> */}

      <View
        style={{
          paddingHorizontal:
            16,
        }}>
        <Text>
          My Total Enquiries
        </Text>

        <Text>
          {count} Enquiries
          Raised
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item =>
          item._id
        }
        renderItem={({
          item,
        }) => (
          <EnquiryCard
            item={item}
            onPress={() =>
              navigation.navigate(
                'EnquiryDetails',
                {
                  enquiryId:
                    item._id,
                },
              )
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
          />
        }
        ListEmptyComponent={
          <EmptyState
            onPress={() =>
              navigation.navigate(
                'Dashboard',
              )
            }
          />
        }
      />
    </View>
  );
};

export default MyEnquiriesScreen;