import {
  StyleSheet,
} from 'react-native';

import {
  fontScale,
  moderateScale,
  scale,
  verticalScale,
} from '../utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(18),
  },

  loader: {
    flex: 1,
    justifyContent:
      'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:
      verticalScale(18),
    marginBottom:
      verticalScale(18),
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize:
      fontScale(15),
    fontWeight: '700',
    color: '#111827',
  },

  headerSpacer: {
    width: scale(22),
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius:
      moderateScale(8),
    padding:
      moderateScale(10),
    backgroundColor: '#fff',
  },

  image: {
    width: scale(118),
    height:
      verticalScale(72),
    borderRadius:
      moderateScale(6),
    backgroundColor: '#E5E7EB',
  },

  info: {
    marginLeft:
      scale(12),
    flex: 1,
  },

  title: {
    fontSize:
      fontScale(14),
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    fontSize:
      fontScale(11),
    color: '#4B5563',
    marginTop:
      verticalScale(4),
  },

  plotMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: scale(14),
    rowGap: verticalScale(4),
    marginTop:
      verticalScale(9),
  },

  plotMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  size: {
    marginLeft: scale(4),
    color: '#111827',
    fontSize:
      fontScale(11),
    fontWeight: '600',
  },

  price: {
    marginLeft: scale(4),
    color: '#111827',
    fontWeight: '700',
    fontSize:
      fontScale(11),
  },

  sectionTitle: {
    marginTop:
      verticalScale(16),
    marginBottom:
      verticalScale(8),
    fontWeight: '700',
    color: '#111827',
    fontSize:
      fontScale(15),
  },

  detailsCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius:
      moderateScale(8),
    backgroundColor: '#fff',
    paddingHorizontal:
      scale(12),
    paddingTop:
      verticalScale(10),
    paddingBottom:
      verticalScale(2),
  },

  row: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom:
      verticalScale(10),
  },

  label: {
    flex: 1,
    color: '#111827',
    fontSize:
      fontScale(13),
    fontWeight: '600',
  },

  value: {
    flex: 1,
    textAlign: 'right',
    color: '#111827',
    fontSize:
      fontScale(13),
    fontWeight: '700',
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop:
      verticalScale(10),
    marginBottom:
      verticalScale(10),
  },

  totalLabel: {
    fontSize: fontScale(14),
    fontWeight: '700',
  },

  total: {
    color: '#138A3D',
    fontWeight: '800',
    fontSize: fontScale(13),
  },

  payButton: {
    height:
      verticalScale(46),
    borderRadius:
      moderateScale(5),
    backgroundColor: '#078A36',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:
      verticalScale(20),
  },

  payButtonText: {
    color: '#fff',
    fontSize:
      fontScale(14),
    fontWeight: '700',
  },
});
