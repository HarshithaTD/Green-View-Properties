import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from '../../../screens/admin/styles';
import { PLOT_STATUSES } from './constants';
import { PlotStatus } from './types';
import SectionCard from './SectionCard';

type StatusSectionProps = {
  value: PlotStatus;
  onChange: (status: PlotStatus) => void;
};

const StatusSection: React.FC<StatusSectionProps> = ({ value, onChange }) => {
  return (
    <SectionCard title="Status" icon="bookmark">
      <View style={styles.statusRow}>
        {PLOT_STATUSES.map(status => {
          const isActive = value === status.label;

          return (
            <TouchableOpacity
              key={status.label}
              activeOpacity={0.85}
              onPress={() => onChange(status.label)}
              style={[
                styles.statusButton,
                {
                  borderColor: status.color,
                  backgroundColor: isActive ? status.color : '#FFF',
                },
              ]}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  {
                    color: isActive ? '#FFF' : status.color,
                  },
                ]}
              >
                {status.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SectionCard>
  );
};

export default StatusSection;
