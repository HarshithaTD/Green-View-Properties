import {
  StyleSheet,
} from 'react-native';

import {
  scale,
  verticalScale,
moderateScale } from '../utils/responsive';

export const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
      paddingHorizontal:
        scale(16),
      paddingVertical:
        verticalScale(14),
      borderBottomWidth: 1,
      borderBottomColor:
        '#EEE',
    },

    headerTitle: {
      fontSize:
        moderateScale(20),
      fontWeight: '700',
    },

    heroCard: {
      flexDirection: 'row',
      backgroundColor:
        '#F2FAF4',
      margin: scale(16),
      padding: scale(16),
      borderRadius: 18,
    },

    heroTitle: {
      color: '#16A34A',
      fontSize:
        moderateScale(24),
      fontWeight: '700',
    },

    heroSub: {
      marginTop: 10,
      fontSize:
        moderateScale(14),
      color: '#555',
    },

    heroImage: {
      width: scale(130),
      height: scale(130),
      resizeMode: 'contain',
    },

    sectionTitle: {
      marginHorizontal:
        scale(16),
      marginTop:
        verticalScale(16),
      marginBottom: 10,
      fontSize:
        moderateScale(22),
      fontWeight: '700',
    },

    contactCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal:
        scale(16),
      padding: scale(16),
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E8E8E8',
      marginBottom: 12,
    },

    contactIcon: {
      width: 60,
      height: 60,
      borderRadius: 14,
      backgroundColor:
        '#F2FAF4',
      justifyContent:
        'center',
      alignItems: 'center',
    },

    contactContent: {
      flex: 1,
      marginLeft: 14,
    },

    contactTitle: {
      fontWeight: '700',
      fontSize: 16,
    },

    contactSub: {
      color: '#666',
      marginTop: 3,
    },

    contactValue: {
      color: '#16A34A',
      marginTop: 5,
      fontWeight: '700',
    },
    topicItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#FFFFFF',
  marginHorizontal: scale(16),
  paddingVertical: verticalScale(14),
  paddingHorizontal: scale(16),
  borderBottomWidth: 1,
  borderBottomColor: '#F0F0F0',
},

topicLeft: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
},

topicIcon: {
  width: scale(40),
  height: scale(40),
  borderRadius: scale(20),
  backgroundColor: '#F2FAF4',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: scale(12),
},

topicTitle: {
  flex: 1,
  fontSize: moderateScale(15),
  color: '#111827',
  fontWeight: '500',
  lineHeight: moderateScale(22),
},
 infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2FAF4',
    marginHorizontal: scale(16),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
    padding: scale(16),
    borderRadius: scale(16),
  },

  infoContent: {
    flex: 1,
    marginLeft: scale(14),
  },

  infoTitle: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: '#111827',
    marginBottom: verticalScale(4),
  },

  infoSub: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    lineHeight: moderateScale(20),
  },
helpContainer: {
  marginHorizontal: scale(16),
  marginTop: verticalScale(24),
  paddingVertical: verticalScale(20),
  paddingHorizontal: scale(16),
  backgroundColor: '#FAFAFA',
  borderRadius: scale(16),
  borderWidth: 1,
  borderColor: '#F0F0F0',
  alignItems: 'center',
},

helpTitle: {
  fontSize: moderateScale(20),
  fontWeight: '700',
  color: '#111827',
  marginBottom: verticalScale(8),
  textAlign: 'center',
},

helpDesc: {
  fontSize: moderateScale(14),
  color: '#6B7280',
  textAlign: 'center',
  lineHeight: moderateScale(22),
},

  });