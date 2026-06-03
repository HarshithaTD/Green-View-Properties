import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

import styles from './styles';
import apiInstance from '../../services/apiInstance';
import { AppDispatch } from '../../redux/store';
import { fetchPlots } from '../../redux/slices/plotSlice';
import AmenitiesSection from '../../components/admin/plotForm/AmenitiesSection';
import BasicInfoSection from '../../components/admin/plotForm/BasicInfoSection';
import DescriptionSection from '../../components/admin/plotForm/DescriptionSection';
import PlotFormHeader from '../../components/admin/plotForm/PlotFormHeader';
import PlotImageSection from '../../components/admin/plotForm/PlotImageSection';
import StatusSection from '../../components/admin/plotForm/StatusSection';
import SubmitButton from '../../components/admin/plotForm/SubmitButton';
import usePlotForm, {
  buildPlotFormData,
} from '../../components/admin/plotForm/usePlotForm';

const AddNewPlotScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const editingPlot = route.params?.plot;
  const isEditing = Boolean(editingPlot?._id);
  const { values, amenities, updateField, updateAmenity, resetForm } =
    usePlotForm(editingPlot);

  const isBlank = (value: string) => !value.trim();

  // Image Picker
  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri || '';

        updateField('imageUri', uri);
        updateField('imageRemoved', false);
      }
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    updateField('imageUri', null);
    updateField('imageRemoved', true);
  };

  // Validation + Submit
  const handleAddPlot = async () => {
    const hasMissingRequiredPlotField =
      isBlank(values.plotTitle) ||
      isBlank(values.township) ||
      isBlank(values.sector) ||
      isBlank(values.size) ||
      isBlank(values.price) ||
      isBlank(values.facing) ||
      isBlank(values.dimension) ||
      isBlank(values.description) ||
      isBlank(values.parkDistance) ||
      isBlank(values.schoolDistance) ||
      isBlank(values.hospitalDistance) ||
      isBlank(values.marketDistance);

    if (!isEditing && hasMissingRequiredPlotField) {
      Alert.alert(
        'Validation',
        'Please fill all fields except image before adding the plot.',
      );
      return;
    }

    try {
      setLoading(true);

      const formData = buildPlotFormData(values);

      const response = isEditing
        ? await apiInstance.put(`/plots/${editingPlot._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        : await apiInstance.post('/plots/add-plot', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

      Alert.alert('Success', response.data.message);

      await dispatch(fetchPlots());

      if (isEditing) {
        navigation.goBack();
      } else {
        resetForm();
      }
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <PlotFormHeader isEditing={isEditing} onBack={navigation.goBack} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <BasicInfoSection
            plotTitle={values.plotTitle}
            township={values.township}
            sector={values.sector}
            size={values.size}
            price={values.price}
            facing={values.facing}
            dimension={values.dimension}
            onPlotTitleChange={text => updateField('plotTitle', text)}
            onTownshipChange={text => updateField('township', text)}
            onSectorChange={text => updateField('sector', text)}
            onSizeChange={text => updateField('size', text)}
            onPriceChange={text => updateField('price', text)}
            onFacingChange={text => updateField('facing', text)}
            onDimensionChange={text => updateField('dimension', text)}
          />

          <PlotImageSection
            imageUri={values.imageUri}
            onSelectImage={handleSelectImage}
            onRemoveImage={handleRemoveImage}
          />

          <DescriptionSection
            value={values.description}
            onChangeText={text => updateField('description', text)}
          />

          <AmenitiesSection values={amenities} onChange={updateAmenity} />

          <StatusSection
            value={values.status}
            onChange={status => updateField('status', status)}
          />

          <SubmitButton
            loading={loading}
            isEditing={isEditing}
            onPress={handleAddPlot}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddNewPlotScreen;
