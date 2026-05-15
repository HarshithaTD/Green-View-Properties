import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

interface Props {
  title: string;
  outlined?: boolean;
  onPress: () => void;
}

const CustomButton = ({
  title,
  outlined,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        outlined && styles.outlinedButton,
      ]}>
      <Text
        numberOfLines={1}
        style={[
          styles.text,
          outlined && styles.outlinedText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  button: {
    width: '100%',

    height: verticalScale(56),
  marginTop: verticalScale(24),
    backgroundColor: '#07BA63',

    borderRadius: moderateScale(14),

    alignItems: 'center',

    justifyContent: 'center',

    alignSelf: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: moderateScale(5),

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  outlinedButton: {
    backgroundColor: '#fff',

    borderWidth: moderateScale(1),

    borderColor: '#0F9D58',
  },

  text: {
    color: '#fff',

    fontWeight: '700',

    fontSize: fontScale(16),

    textAlign: 'center',
  },

  outlinedText: {
    color: '#0F9D58',
  },
});