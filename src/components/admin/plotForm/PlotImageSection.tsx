import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { API_HOST } from '../../../services/apiConfig';
import styles from '../../../screens/admin/styles';
import { scale } from '../../../utils/responsive';
import { PRIMARY } from './constants';
import SectionCard from './SectionCard';

type PlotImageSectionProps = {
  imageUri: string | null;
  onSelectImage: () => void;
  onRemoveImage: () => void;
};

const getImageUri = (imageUri: string) => {
  if (imageUri.startsWith('file://') || imageUri.startsWith('content://')) {
    return imageUri;
  }

  return `${API_HOST}/${imageUri}`;
};

const PlotImageSection: React.FC<PlotImageSectionProps> = ({
  imageUri,
  onSelectImage,
  onRemoveImage,
}) => {
  return (
    <SectionCard title="Plot Image" icon="image">
      <View style={styles.imageUploadBoxContainer}>
        {imageUri ? (
          <View style={styles.selectedImagePreviewWrapper}>
            <TouchableOpacity
              style={styles.selectedImagePreviewWrapper}
              activeOpacity={0.85}
              onPress={onSelectImage}
            >
              <Image
                source={{
                  uri: getImageUri(imageUri),
                }}
                style={styles.previewImageElement}
              />
            </TouchableOpacity>

            <View style={styles.changeImageIndicatorBadge}>
              <Feather name="edit-2" size={scale(12)} color="#FFF" />

              <Text style={styles.changeImageText}>Change Image</Text>
            </View>

            <TouchableOpacity
              style={styles.cameraOverlayButton}
              onPress={onSelectImage}
            >
              <Feather name="camera" size={scale(18)} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onRemoveImage}
              style={styles.removeImageButton}
            >
              <Feather name="x" size={scale(16)} color="#111" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadPlaceholderContentAligner}>
            <View style={styles.uploadCloudIconCircle}>
              <Feather name="upload-cloud" size={scale(28)} color={PRIMARY} />
            </View>

            <Text style={styles.uploadInstructionBoldText}>
              Upload Plot Image
            </Text>

            <Text style={styles.uploadInstructionMetaText}>
              PNG, JPG supported
            </Text>

            <TouchableOpacity
              style={styles.chooseImageButton}
              activeOpacity={0.85}
              onPress={onSelectImage}
            >
              <Feather name="image" size={scale(18)} color={PRIMARY} />

              <Text style={styles.chooseImageText}>Choose Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SectionCard>
  );
};

export default PlotImageSection;
