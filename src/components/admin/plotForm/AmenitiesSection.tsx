import React from 'react';
import { Text, TextInput, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import styles from '../../../screens/admin/styles';
import { scale } from '../../../utils/responsive';
import { AMENITIES } from './constants';
import { AmenitiesForm } from './types';
import SectionCard from './SectionCard';

type AmenitiesSectionProps = {
  values: AmenitiesForm;
  onChange: (key: keyof AmenitiesForm, value: string) => void;
};

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  values,
  onChange,
}) => {
  return (
    <SectionCard title="Nearby Amenities *" icon="map-pin">
      {AMENITIES.map(item => (
        <View key={item.key} style={styles.amenityRow}>
          <View style={styles.amenityLeftContent}>
            <View
              style={[
                styles.amenityIconBox,
                {
                  backgroundColor: `${item.color}15`,
                },
              ]}
            >
              <Feather name={item.icon} size={scale(18)} color={item.color} />
            </View>

            <Text style={styles.amenityTitle}>{item.title} *</Text>
          </View>

          <TextInput
            placeholder={`Distance (e.g., ${item.placeholder})`}
            placeholderTextColor="#9CA3AF"
            value={values[item.key]}
            onChangeText={text => onChange(item.key, text)}
            style={styles.distanceInput}
          />
        </View>
      ))}
    </SectionCard>
  );
};

export default AmenitiesSection;
