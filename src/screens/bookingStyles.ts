import {
  StyleSheet,
} from 'react-native';

import { fontScale, moderateScale, scale, verticalScale } from '../utils/responsive';



export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      '#fff',
    paddingHorizontal:
      scale(16),
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
      verticalScale(20),
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize:
      fontScale(18),
    fontWeight: '700',
    marginRight:
      scale(24),
  },

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor:
      '#E8E8E8',
    borderRadius:
      moderateScale(12),
    padding:
      moderateScale(10),
  },

  image: {
    width: scale(100),
    height:
      verticalScale(70),
    borderRadius:
      moderateScale(8),
  },

  info: {
    marginLeft:
      scale(12),
    flex: 1,
  },

  title: {
    fontSize:
      fontScale(18),
    fontWeight: '600',
  },

  subtitle: {
    fontSize:
      fontScale(14),
    color: '#777',
    marginTop: 2,
  },

  size: {
    marginTop: 5,
    fontSize:
      fontScale(14),
  },

  price: {
    marginTop: 4,
    fontWeight: '700',
    fontSize:
      fontScale(17),
  },

  sectionTitle: {
    marginTop:
      verticalScale(24),
    marginBottom:
      verticalScale(12),
    fontWeight: '700',
    fontSize:
      fontScale(16),
  },

  row: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom:
      verticalScale(12),
  },

  label: {
    color: '#666',
    fontSize:
      fontScale(15),
  },

  value: {
    color: '#222',
    fontSize:
      fontScale(15),
    fontWeight: '500',
  },

  total: {
    color: '#1E8E3E',
    fontWeight: '700',
    fontSize:
      fontScale(18),
  },


});