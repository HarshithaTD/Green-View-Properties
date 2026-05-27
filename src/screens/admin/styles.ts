import {StyleSheet} from 'react-native';

import {
  fontScale,
  scale,
  screenWidth,
  verticalScale,
} from '../../utils/responsive';

const PRIMARY = '#0E8F4B';


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContainer: {
    paddingHorizontal: scale(18),
    paddingBottom: verticalScale(40),
  },

  // Header
  header: {
    height: verticalScale(70),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFF',
  },

  iconButton: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: fontScale(22),
    fontWeight: '700',
    color: '#111827',
  },

  // Section Card
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: scale(18),
    padding: scale(16),
    marginTop: verticalScale(18),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 4,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  sectionTitle: {
    marginLeft: scale(8),
    fontSize: fontScale(18),
    fontWeight: '700',
    color: PRIMARY,
  },

  // Inputs
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  halfInput: {
    width: '48%',
  },

  inputWrapper: {
    marginBottom: verticalScale(14),
  },

  inputLabel: {
    fontSize: fontScale(14),
    fontWeight: '600',
    color: '#111827',
    marginBottom: verticalScale(8),
  },

  input: {
    minHeight: verticalScale(56),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(14),
    paddingHorizontal: scale(16),
    fontSize: fontScale(15),
    color: '#111827',
    backgroundColor: '#FFF',
  },

  multilineInput: {
    height: verticalScale(120),
    textAlignVertical: 'top',
    paddingTop: verticalScale(16),
  },

  // Image Upload
  imageUploadBoxContainer: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#7DD3A8',
    borderRadius: scale(18),
    minHeight: verticalScale(250),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#F8FFFB',
  },

  uploadPlaceholderContentAligner: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadCloudIconCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  uploadInstructionBoldText: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: PRIMARY,
    marginBottom: verticalScale(6),
  },

  uploadInstructionMetaText: {
    fontSize: fontScale(14),
    color: '#6B7280',
    marginBottom: verticalScale(18),
  },

  chooseImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: PRIMARY,
    borderRadius: scale(14),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
  },

  chooseImageText: {
    marginLeft: scale(8),
    fontSize: fontScale(15),
    fontWeight: '700',
    color: PRIMARY,
  },

  selectedImagePreviewWrapper: {
    width: '100%',
    height: verticalScale(260),
  },

  previewImageElement: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  changeImageIndicatorBadge: {
    position: 'absolute',
    left: scale(14),
    bottom: scale(14),
    backgroundColor: 'rgba(0,0,0,0.55)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(7),
    borderRadius: scale(20),
  },

  changeImageText: {
    color: '#FFF',
    marginLeft: scale(6),
    fontSize: fontScale(12),
    fontWeight: '600',
  },

  cameraOverlayButton: {
    position: 'absolute',
    right: scale(18),
    bottom: scale(18),
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  removeImageButton: {
    position: 'absolute',
    top: scale(14),
    right: scale(14),
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Amenities
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(14),
  },

  amenityLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '38%',
  },

  amenityIconBox: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },

  amenityTitle: {
    fontSize: fontScale(15),
    fontWeight: '600',
    color: '#111827',
  },

  distanceInput: {
    width: '58%',
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    fontSize: fontScale(14),
    color: '#111827',
  },

  // Status
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statusButton: {
    width:
      (screenWidth - scale(72)) / 3,
    height: verticalScale(52),
    borderWidth: 1.5,
    borderRadius: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusButtonText: {
    fontSize: fontScale(15),
    fontWeight: '700',
  },

  // CTA
  addButton: {
    height: verticalScale(58),
    backgroundColor: PRIMARY,
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(24),

    shadowColor: PRIMARY,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 8,

    elevation: 6,
  },

  addButtonText: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: '#FFF',
  },
});
export default styles;