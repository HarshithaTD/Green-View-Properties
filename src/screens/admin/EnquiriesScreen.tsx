import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../components/SearchBar';
import EnquiryCard from '../../components/admin/EnquiryCard';
import StatusTabs from '../../components/admin/StatusTabs';
import Header from '../../components/admin/Header';
import { RootState } from '../../redux/store';
import { fetchEnquiries } from '../../redux/slices/enquirySlice';
import socket from '../../services/socket';




export default function EnquiriesScreen({
  navigation,
}: any) {
    const enquiryTabs = [
  'All',
  'New',
  'Contacted',
  'Closed',
];

  const dispatch = useDispatch<any>();


  const {enquiries, loading} = useSelector(
    (state: RootState) => state.enquiries,
  );

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {
    loadEnquiries();
  }, [search, status]);

  useEffect(() => {
    const reloadEnquiries = () => {
      loadEnquiries();
    };

    socket.on('new_enquiry', reloadEnquiries);
    socket.on('enquiry_updated', reloadEnquiries);
    socket.on('enquiry_deleted', reloadEnquiries);

    return () => {
      socket.off('new_enquiry', reloadEnquiries);
      socket.off('enquiry_updated', reloadEnquiries);
      socket.off('enquiry_deleted', reloadEnquiries);
    };
  }, [search, status]);

  const loadEnquiries = () => {
    dispatch(
      fetchEnquiries({
        search,
        status,
      }),
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    loadEnquiries();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [search, status]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
      />

 <Header
  navigation={navigation}
  title="Enquiries"
  notificationCount={3}
/>

     {/* <View style={styles.searchContainer}>
  <SearchBar
    value={search}
    onChangeText={setSearch}
  />
</View> */}

    {/* <StatusTabs
  tabs={enquiryTabs}
  selectedTab={status}
  onSelect={setStatus}
  containerStyle={{
    marginTop: 0,
  }}
/> */}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0f9d58"
          style={{marginTop: 50}}
        />
      ) : (
        <FlatList
          data={enquiries}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <EnquiryCard item={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0f9d58']}
            />
          }
        />
      )}

      <TouchableOpacity style={styles.fab}>
        <Ionicons
          name="filter"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
searchContainer: {
  paddingHorizontal: 16,
  marginTop: 5,
  
},
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#0f9d58',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#0f9d58',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },
});
