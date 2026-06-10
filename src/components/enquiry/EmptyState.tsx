import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  onPress: () => void;
}

const EmptyState = ({
  onPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        No Enquiries Found
      </Text>

      <Text style={styles.sub}>
        You haven't raised any
        enquiries yet.
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={onPress}>
        <Text
          style={styles.btnText}>
          Explore Plots
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  sub: {
    marginTop: 8,
    color: '#6B7280',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#2563EB',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});