import React from 'react';
import { View } from 'react-native';

import styles from '../../../screens/admin/styles';
import SectionCard from './SectionCard';
import FormInput from './FormInput';

type BasicInfoSectionProps = {
  plotTitle: string;
  township: string;
  sector: string;
  size: string;
  price: string;
  facing: string;
  dimension: string;
  onPlotTitleChange: (text: string) => void;
  onTownshipChange: (text: string) => void;
  onSectorChange: (text: string) => void;
  onSizeChange: (text: string) => void;
  onPriceChange: (text: string) => void;
  onFacingChange: (text: string) => void;
  onDimensionChange: (text: string) => void;
};

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  plotTitle,
  township,
  sector,
  size,
  price,
  facing,
  dimension,
  onPlotTitleChange,
  onTownshipChange,
  onSectorChange,
  onSizeChange,
  onPriceChange,
  onFacingChange,
  onDimensionChange,
}) => {
  return (
    <SectionCard title="Basic Information" icon="file-text">
      <FormInput
        label="Plot Title / Reference *"
        placeholder="e.g., Plot # E-450"
        value={plotTitle}
        onChangeText={onPlotTitleChange}
      />

      <View style={styles.row}>
        <FormInput
          label="Location Township *"
          placeholder="e.g., Palm Meadows"
          value={township}
          onChangeText={onTownshipChange}
          containerStyle={styles.halfInput}
        />

        <FormInput
          label="Sector Zone *"
          placeholder="e.g., Sector 5"
          value={sector}
          onChangeText={onSectorChange}
          containerStyle={styles.halfInput}
        />
      </View>

      <View style={styles.row}>
        <FormInput
          label="Size (sq.ft) *"
          placeholder="e.g., 1000 sq.ft"
          value={size}
          onChangeText={onSizeChange}
          keyboardType="numeric"
          containerStyle={styles.halfInput}
        />

        <FormInput
          label="Price (Rs.) *"
          placeholder="e.g., 20,00,000"
          value={price}
          onChangeText={onPriceChange}
          keyboardType="numeric"
          containerStyle={styles.halfInput}
        />
      </View>

      <View style={styles.row}>
        <FormInput
          label="Facing Orientation *"
          placeholder="e.g., East Facing"
          value={facing}
          onChangeText={onFacingChange}
          containerStyle={styles.halfInput}
        />

        <FormInput
          label="Dimension (L x B) *"
          placeholder="e.g., 25 x 40"
          value={dimension}
          onChangeText={onDimensionChange}
          containerStyle={styles.halfInput}
        />
      </View>
    </SectionCard>
  );
};

export default BasicInfoSection;
