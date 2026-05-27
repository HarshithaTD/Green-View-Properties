import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';

interface StatusTabsProps {
  tabs: string[];
  selectedTab: string;
  onSelect: (tab: string) => void;

  // Optional Customization
  containerStyle?: object;
  activeColors?: string[];
  showScroll?: boolean;
}

const StatusTabs = ({
  tabs,
  selectedTab,
  onSelect,
  containerStyle,
  activeColors = ['#0B5D1E', '#128C2E'],
  showScroll = true,
}: StatusTabsProps) => {
  const Content = () => (
    <View
      style={[
        styles.container,
        containerStyle,
      ]}>
      {tabs.map(tab => {
        const active =
          selectedTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() =>
              onSelect(tab)
            }>
            {active ? (
              <LinearGradient
                colors={activeColors}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={
                  styles.activeTab
                }>
                <Text
                  style={
                    styles.activeText
                  }>
                  {tab}
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.tab}>
                <Text style={styles.text}>
                  {tab}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  if (!showScroll) {
    return <Content />;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={
        false
      }
      contentContainerStyle={
        styles.scrollContainer
      }>
      <Content />
    </ScrollView>
  );
};

export default StatusTabs;

const TAB_RADIUS =
  moderateScale(30);

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: scale(16),

    
    paddingTop: verticalScale(4),

    paddingBottom: verticalScale(4),
  },

  container: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  tab: {
    height: verticalScale(42),

    paddingHorizontal: scale(20),

    backgroundColor: '#F5F5F5',

    borderRadius: TAB_RADIUS,

    marginRight: scale(10),

    justifyContent: 'center',

    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#EEEEEE',

    minWidth: scale(82),
  },

  activeTab: {
    height: verticalScale(42),

    paddingHorizontal: scale(20),

    borderRadius: TAB_RADIUS,

    marginRight: scale(10),

    justifyContent: 'center',

    alignItems: 'center',

    minWidth: scale(82),

    shadowColor: '#0B5D1E',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.18,

    shadowRadius: 5,

    elevation: 4,
  },

  text: {
    color: '#555555',

    fontWeight: '600',

    fontSize: fontScale(13),
  },

  activeText: {
    color: '#FFFFFF',

    fontWeight: '700',

    fontSize: fontScale(13),
  },
});