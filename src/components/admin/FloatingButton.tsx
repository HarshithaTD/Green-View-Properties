import React from 'react';

import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

interface Props {
  onPress: () => void;
}

const FloatingButton = ({
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}>
      <LinearGradient
        colors={['#0B5D1E', '#128C2E']}
        style={styles.button}>
        <Icon
          name="add"
          size={moderateScale(30)}
          color="#FFFFFF"
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const BUTTON_SIZE = scale(64);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    bottom: verticalScale(50),
    right: scale(20),

    zIndex: 999,
  },

  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,

    borderRadius:
      BUTTON_SIZE / 2,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});