import React from 'react';

import SectionCard from './SectionCard';
import FormInput from './FormInput';

type DescriptionSectionProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <SectionCard title="Description *" icon="file-text">
      <FormInput
        placeholder="Enter plot description..."
        value={value}
        onChangeText={onChangeText}
        multiline
      />
    </SectionCard>
  );
};

export default DescriptionSection;
