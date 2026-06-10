import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from '../../styles/helpAndSupportStyle';

const Header = ({
  navigation,
}: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }>
        <Ionicons
          name="arrow-back"
          size={26}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        Help & Support
      </Text>

      <View style={{width: 26}} />
    </View>
  );
};

export default Header;