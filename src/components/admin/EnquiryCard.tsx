import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

interface Enquiry {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  message?: string;
  plotTitle: string;
  plotLocation: string;
  plotPrice: string;
  status?:
    | 'New'
    | 'Contacted'
    | 'Closed'
    | string;
  createdAt?: string;
  avatar?: string;
}

interface Props {
  item: Enquiry;
}

export default function EnquiryCard({
  item,
}: Props) {
  const status = item.status || 'New';

  return (
    <View style={styles.card}>
      {/* TOP */}
      <View style={styles.topRow}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri:
                item.avatar ||
                'https://i.pravatar.cc/150',
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.phone}>
              {item.mobile}
            </Text>
          </View>
        </View>

        {/* STATUS */}
        <View
          style={[
            styles.statusBadge,

            status === 'New'
              ? styles.newBadge
              : status ===
                'Contacted'
              ? styles.contactBadge
              : styles.closedBadge,
          ]}>
          <Text style={styles.statusText}>
            {status}
          </Text>
        </View>
      </View>

      {/* PLOT */}
      <View style={styles.detailRow}>
        <Text style={styles.label}>
          Plot
        </Text>

        <Text style={styles.value}>
          {item.plotTitle}
        </Text>
      </View>

      {/* LOCATION */}
      <View style={styles.detailRow}>
        <Text style={styles.label}>
          Location
        </Text>

        <Text style={styles.value}>
          {item.plotLocation}
        </Text>
      </View>

      {/* PRICE */}
      <View style={styles.detailRow}>
        <Text style={styles.label}>
          Price
        </Text>

        <Text style={styles.value}>
          ₹ {item.plotPrice}
        </Text>
      </View>

      {/* MESSAGE */}
      <View style={styles.detailColumn}>
        <Text style={styles.label}>
          Message
        </Text>

        <Text style={styles.message}>
          {item.message ||
            'No message provided'}
        </Text>
      </View>

      {/* DATE */}
      <Text style={styles.date}>
        {item.createdAt
          ? new Date(
              item.createdAt,
            ).toLocaleString()
          : 'Date not available'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 20,

    marginBottom: 16,

    borderRadius: 20,

    padding: 16,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  userInfo: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },

  avatar: {
    width: 52,

    height: 52,

    borderRadius: 26,

    marginRight: 12,
  },

  name: {
    fontSize: 17,

    fontWeight: '700',

    color: '#111111',
  },

  phone: {
    color: '#777777',

    marginTop: 4,
  },

  statusBadge: {
    paddingHorizontal: 14,

    paddingVertical: 6,

    borderRadius: 12,
  },

  newBadge: {
    backgroundColor: '#E8F7ED',
  },

  contactBadge: {
    backgroundColor: '#E8F0FF',
  },

  closedBadge: {
    backgroundColor: '#F2F2F2',
  },

  statusText: {
    fontWeight: '700',

    color: '#0F9D58',
  },

  detailRow: {
    flexDirection: 'row',

    marginTop: 14,
  },

  detailColumn: {
    marginTop: 16,
  },

  label: {
    width: 80,

    color: '#777777',

    fontSize: 13,

    fontWeight: '600',
  },

  value: {
    flex: 1,

    color: '#111111',

    fontWeight: '600',
  },

  message: {
    marginTop: 6,

    color: '#333333',

    lineHeight: 20,
  },

  date: {
    marginTop: 18,

    color: '#999999',

    fontSize: 12,
  },
});
