// AddNewPlotScreen.tsx

import React, {
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
 
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
import {
  scale,
} from '../../utils/responsive';
import apiInstance from '../../services/apiInstance';

const PRIMARY = '#0E8F4B';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: any;
  containerStyle?: any;
}

interface SectionCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline,
  keyboardType,
  containerStyle,
}) => {
  return (
    <View style={[styles.inputWrapper, containerStyle]}>
      {label ? (
        <Text style={styles.inputLabel}>
          {label}
        </Text>
      ) : null}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
      />
    </View>
  );
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Feather
          name={icon}
          size={scale(18)}
          color={PRIMARY}
        />

        <Text style={styles.sectionTitle}>
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
};

const amenitiesData = [
  {
    title: 'Park',
    icon: 'map-pin',
    color: '#16A34A',
  },
  {
    title: 'School',
    icon: 'book-open',
    color: '#9333EA',
  },
  {
    title: 'Hospital',
    icon: 'plus-square',
    color: '#EF4444',
  },
  {
    title: 'Market',
    icon: 'shopping-cart',
    color: '#F97316',
  },
];

const AddNewPlotScreen = () => {
  const [loading, setLoading] = useState(false);
const navigation = useNavigation<any>();
const route = useRoute<any>();
const editingPlot = route.params?.plot;
const isEditing = Boolean(editingPlot?._id);
  // Basic Information States
  const [plotTitle, setPlotTitle] = useState('');
  const [township, setTownship] = useState('');
  const [sector, setSector] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [facing, setFacing] = useState('');
  const [dimension, setDimension] = useState('');
  const [description, setDescription] = useState('');

  // Amenities
  const [parkDistance, setParkDistance] = useState('');
  const [schoolDistance, setSchoolDistance] = useState('');
  const [hospitalDistance, setHospitalDistance] = useState('');
  const [marketDistance, setMarketDistance] = useState('');

  // Status
  const [selectedStatus, setSelectedStatus] =
    useState<'Available' | 'Booked' | 'Sold'>(
      'Available',
    );
// Reset Form Fields
const resetForm = () => {
  // Basic Information
  setPlotTitle('');
  setTownship('');
  setSector('');
  setSize('');
  setPrice('');
  setFacing('');
  setDimension('');
  setDescription('');

  // Amenities
  setParkDistance('');
  setSchoolDistance('');
  setHospitalDistance('');
  setMarketDistance('');

  // Status
  setSelectedStatus('Available');

  // Image
  setSelectedImageUri(null);
};

  // Dynamic Image
  const [selectedImageUri, setSelectedImageUri] =
    useState<string | null>(null);

  useEffect(() => {
    if (!editingPlot) {
      return;
    }

    setPlotTitle(editingPlot.title || '');
    setTownship(editingPlot.location || '');
    setSector(editingPlot.sector || '');
    setSize(editingPlot.size || '');
    setPrice(editingPlot.price || '');
    setFacing(editingPlot.facing || '');
    setDimension(editingPlot.dimension || '');
    setDescription(editingPlot.description || '');
    setParkDistance(
      editingPlot.amenities?.parkDistance || '',
    );
    setSchoolDistance(
      editingPlot.amenities?.schoolDistance || '',
    );
    setHospitalDistance(
      editingPlot.amenities?.hospitalDistance || '',
    );
    setMarketDistance(
      editingPlot.amenities?.marketDistance || '',
    );
    setSelectedStatus(
      editingPlot.status || 'Available',
    );
    setSelectedImageUri(null);
  }, [editingPlot]);

  // Image Picker
  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (
        !result.didCancel &&
        result.assets &&
        result.assets.length > 0
      ) {
        const uri = result.assets[0].uri || '';

        setSelectedImageUri(uri);
      }
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setSelectedImageUri(null);
  };

  
// Validation + Submit
const handleAddPlot = async () => {
  if (
    !plotTitle ||
    !township ||
    !sector ||
    !size ||
    !price
  ) {
    Alert.alert(
      'Validation',
      'Please fill all required fields.',
    );
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append('title', plotTitle);

    formData.append('location', township);

    formData.append(
      'sector',
      sector,
    );

    formData.append(
      'size',
      size,
    );

    formData.append(
      'price',
      price,
    );

    formData.append(
      'facing',
      facing,
    );

    formData.append(
      'dimension',
      dimension,
    );

    formData.append(
      'description',
      description,
    );

    formData.append(
      'parkDistance',
      parkDistance,
    );

    formData.append(
      'schoolDistance',
      schoolDistance,
    );

    formData.append(
      'hospitalDistance',
      hospitalDistance,
    );

    formData.append(
      'marketDistance',
      marketDistance,
    );

    formData.append(
      'status',
      selectedStatus,
    );

    if (selectedImageUri) {
      formData.append('image', {
        uri: selectedImageUri,
        type: 'image/jpeg',
        name: 'plot.jpg',
      });
    }

    const response = isEditing
      ? await apiInstance.put(
          `/plots/${editingPlot._id}`,
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          },
        )
      : await apiInstance.post(
          '/plots/add-plot',
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          },
        );

    Alert.alert(
      'Success',
      response.data.message,
    );

    if (isEditing) {
      navigation.goBack();
    } else {
      resetForm();
    }
  } catch (error) {
    console.log(error);

    Alert.alert(
      'Error',
      'Something went wrong',
    );
  } finally {
    setLoading(false);
  }
};

  // Status Button UI
  const renderStatusButton = (
    label: 'Available' | 'Booked' | 'Sold',
    activeColor: string,
  ) => {
    const isActive = selectedStatus === label;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setSelectedStatus(label)}
        style={[
          styles.statusButton,
          {
            borderColor: activeColor,
            backgroundColor: isActive
              ? activeColor
              : '#FFF',
          },
        ]}>
        <Text
          style={[
            styles.statusButtonText,
            {
              color: isActive
                ? '#FFF'
                : activeColor,
            },
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() =>
    navigation.goBack()
  }>
            <Feather
              name="arrow-left"
              size={scale(24)}
              color="#111827"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {isEditing
              ? 'Edit Plot'
              : 'Add New Plot'}
          </Text>

          <TouchableOpacity style={styles.iconButton}>
            <Feather
              name="upload-cloud"
              size={scale(22)}
              color={PRIMARY}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContainer
          }>
          {/* Basic Information */}
          <SectionCard
            title="Basic Information"
            icon="file-text">
            <CustomInput
              label="Plot Title / Reference *"
              placeholder="e.g., Plot # E-450"
              value={plotTitle}
              onChangeText={setPlotTitle}
            />

            <View style={styles.row}>
              <CustomInput
                label="Location Township *"
                placeholder="e.g., Palm Meadows"
                value={township}
                onChangeText={setTownship}
                containerStyle={styles.halfInput}
              />

              <CustomInput
                label="Sector Zone *"
                placeholder="e.g., Sector 5"
                value={sector}
                onChangeText={setSector}
                containerStyle={styles.halfInput}
              />
            </View>

            <View style={styles.row}>
              <CustomInput
                label="Size (sq.ft) *"
                placeholder="e.g., 1000 sq.ft"
                value={size}
                onChangeText={setSize}
                keyboardType="numeric"
                containerStyle={styles.halfInput}
              />

              <CustomInput
                label="Price (₹) *"
                placeholder="e.g., 20,00,000"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                containerStyle={styles.halfInput}
              />
            </View>

            <View style={styles.row}>
              <CustomInput
                label="Facing Orientation"
                placeholder="e.g., East Facing"
                value={facing}
                onChangeText={setFacing}
                containerStyle={styles.halfInput}
              />

              <CustomInput
                label="Dimension (L x B)"
                placeholder="e.g., 25 x 40"
                value={dimension}
                onChangeText={setDimension}
                containerStyle={styles.halfInput}
              />
            </View>
          </SectionCard>

          {/* Plot Image Upload */}
          <SectionCard
            title="Plot Image"
            icon="image">
            {/* Dynamic Plot Image Upload Component Block */}
            <TouchableOpacity
              style={styles.imageUploadBoxContainer}
              activeOpacity={0.85}
              onPress={handleSelectImage}>
              {selectedImageUri ? (
                <View
                  style={
                    styles.selectedImagePreviewWrapper
                  }>
                  <Image
                    source={{
                      uri: selectedImageUri,
                    }}
                    style={
                      styles.previewImageElement
                    }
                  />

                  {/* Change Badge */}
                  <View
                    style={
                      styles.changeImageIndicatorBadge
                    }>
                    <Feather
                      name="edit-2"
                      size={scale(12)}
                      color="#FFF"
                    />

                    <Text
                      style={
                        styles.changeImageText
                      }>
                      Change Image
                    </Text>
                  </View>

                  {/* Camera Overlay */}
                  <TouchableOpacity
                    style={
                      styles.cameraOverlayButton
                    }>
                    <Feather
                      name="camera"
                      size={scale(18)}
                      color="#FFF"
                    />
                  </TouchableOpacity>

                  {/* Remove Button */}
                  <TouchableOpacity
                    onPress={handleRemoveImage}
                    style={styles.removeImageButton}>
                    <Feather
                      name="x"
                      size={scale(16)}
                      color="#111"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={
                    styles.uploadPlaceholderContentAligner
                  }>
                  <View
                    style={
                      styles.uploadCloudIconCircle
                    }>
                    <Feather
                      name="upload-cloud"
                      size={scale(28)}
                      color={PRIMARY}
                    />
                  </View>

                  <Text
                    style={
                      styles.uploadInstructionBoldText
                    }>
                    Upload Plot Image
                  </Text>

                  <Text
                    style={
                      styles.uploadInstructionMetaText
                    }>
                    PNG, JPG supported
                  </Text>

                  <TouchableOpacity
                    style={styles.chooseImageButton}>
                    <Feather
                      name="image"
                      size={scale(18)}
                      color={PRIMARY}
                    />

                    <Text
                      style={
                        styles.chooseImageText
                      }>
                      Choose Image
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </SectionCard>

          {/* Description */}
          <SectionCard
            title="Description"
            icon="file-text">
            <CustomInput
              placeholder="Enter plot description..."
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </SectionCard>

          {/* Amenities */}
          <SectionCard
            title="Nearby Amenities"
            icon="map-pin">
            {amenitiesData.map((item, index) => {
              const values = [
                parkDistance,
                schoolDistance,
                hospitalDistance,
                marketDistance,
              ];

              const setters = [
                setParkDistance,
                setSchoolDistance,
                setHospitalDistance,
                setMarketDistance,
              ];

              return (
                <View
                  key={index}
                  style={styles.amenityRow}>
                  <View
                    style={
                      styles.amenityLeftContent
                    }>
                    <View
                      style={[
                        styles.amenityIconBox,
                        {
                          backgroundColor:
                            `${item.color}15`,
                        },
                      ]}>
                      <Feather
                        name={item.icon}
                        size={scale(18)}
                        color={item.color}
                      />
                    </View>

                    <Text
                      style={
                        styles.amenityTitle
                      }>
                      {item.title}
                    </Text>
                  </View>

                  <TextInput
                    placeholder={`Distance (e.g., ${
                      index === 0
                        ? '200 m'
                        : index === 1
                        ? '500 m'
                        : index === 2
                        ? '1.2 km'
                        : '800 m'
                    })`}
                    placeholderTextColor="#9CA3AF"
                    value={values[index]}
                    onChangeText={setters[index]}
                    style={styles.distanceInput}
                  />
                </View>
              );
            })}
          </SectionCard>

          {/* Status */}
          <SectionCard
            title="Status"
            icon="bookmark">
            <View style={styles.statusRow}>
              {renderStatusButton(
                'Available',
                '#0E8F4B',
              )}

              {renderStatusButton(
                'Booked',
                '#F97316',
              )}

              {renderStatusButton(
                'Sold',
                '#EF4444',
              )}
            </View>
          </SectionCard>

          {/* CTA */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleAddPlot}
            style={styles.addButton}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.addButtonText}>
                {isEditing
                  ? 'Update Plot'
                  : 'Add Plot'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddNewPlotScreen;
