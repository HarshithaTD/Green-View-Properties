import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  Alert,
  Linking,
} from 'react-native';



import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  TOPICS,
} from '../constants/supportConstants';

import {styles} from '../styles/helpAndSupportStyle';
import Header from '../components/Help&support/Header';
import TopicItem from '../components/Help&support/TopicItem';
import InfoCard from '../components/Help&support/InfoCard';
import ContactCard from '../components/Help&support/ContactCard';

const HelpSupportScreen = ({
  navigation,
}: any) => {
  const handleCall = async () => {
    const url = `tel:${SUPPORT_PHONE}`;

    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'Unable to open dialer',
      );
    }
  };

  const handleEmail = async () => {
    const url = `mailto:${SUPPORT_EMAIL}?subject=Support Request`;

    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'Unable to open email app',
      );
    }
  };

  return (
    <View
      style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }>
        <View style={styles.heroCard}>
          <View style={{flex: 1}}>
            <Text style={styles.heroTitle}>
              We're here to help!
            </Text>

            <Text
              style={styles.heroSub}>
              Get quick answers to
              your questions or reach
              out to our support
              team.
            </Text>
          </View>

          <Image
            source={require('../assets/images/help-agent.png')}
            style={styles.heroImage}
          />
        </View>

        <Text style={styles.sectionTitle}>
          Contact Us
        </Text>

        <ContactCard
          icon="call-outline"
          title="Call Us"
          subtitle="Speak with our support executive"
          value="+91 7676324216"
          onPress={handleCall}
        />

        <ContactCard
          icon="mail-outline"
          title="Email Us"
          subtitle="We usually respond within 24 hours"
          value={SUPPORT_EMAIL}
          onPress={handleEmail}
        />

        <Text style={styles.sectionTitle}>
          Popular Topics
        </Text>

        <FlatList
          scrollEnabled={false}
          data={TOPICS}
          keyExtractor={item =>
            item.id
          }
          renderItem={({item}) => (
            <TopicItem
              item={item}
              onPress={() =>
                navigation.navigate(
                  'TopicDetailsScreen',
                  {
                    topic:
                      item.title,
                  },
                )
              }
            />
          )}
        />

        <View style={styles.helpContainer}>
          <Text
            style={
              styles.helpTitle
            }>
            Still Need Help?
          </Text>

          <Text style={styles.helpDesc}>
            Our team is available
            from 9:00 AM to 6:00 PM
            (Mon - Sat). We're here
            to make your property
            journey smooth and easy.
          </Text>
        </View>

        <InfoCard />
      </ScrollView>
    </View>
  );
};

export default HelpSupportScreen;