import { useEffect, useMemo, useState } from 'react';

import { AmenitiesForm, PlotFormValues, PlotStatus } from './types';

const DEFAULT_VALUES: PlotFormValues = {
  plotTitle: '',
  township: '',
  sector: '',
  size: '',
  price: '',
  facing: '',
  dimension: '',
  description: '',
  parkDistance: '',
  schoolDistance: '',
  hospitalDistance: '',
  marketDistance: '',
  status: 'Available',
  imageUri: null,
  imageRemoved: false,
};

const toPlotStatus = (status?: string): PlotStatus => {
  if (status === 'Available' || status === 'Booked' || status === 'Sold') {
    return status;
  }

  return 'Available';
};

const getPlotValues = (plot: any): PlotFormValues => ({
  plotTitle: plot?.title || '',
  township: plot?.location || '',
  sector: plot?.sector || '',
  size: plot?.size || '',
  price: plot?.price || '',
  facing: plot?.facing || '',
  dimension: plot?.dimension || '',
  description: plot?.description || '',
  parkDistance: plot?.amenities?.parkDistance || '',
  schoolDistance: plot?.amenities?.schoolDistance || '',
  hospitalDistance: plot?.amenities?.hospitalDistance || '',
  marketDistance: plot?.amenities?.marketDistance || '',
  status: toPlotStatus(plot?.status),
  imageUri: plot?.image || null,
  imageRemoved: false,
});

const isLocalImageUri = (uri: string | null) =>
  Boolean(uri && (uri.startsWith('file://') || uri.startsWith('content://')));

export const buildPlotFormData = (values: PlotFormValues) => {
  const formData = new FormData();

  formData.append('title', values.plotTitle.trim());
  formData.append('location', values.township.trim());
  formData.append('sector', values.sector.trim());
  formData.append('size', values.size.trim());
  formData.append('price', values.price.trim());
  formData.append('facing', values.facing.trim());
  formData.append('dimension', values.dimension.trim());
  formData.append('description', values.description.trim());
  formData.append('parkDistance', values.parkDistance.trim());
  formData.append('schoolDistance', values.schoolDistance.trim());
  formData.append('hospitalDistance', values.hospitalDistance.trim());
  formData.append('marketDistance', values.marketDistance.trim());
  formData.append('status', values.status);

  if (values.imageRemoved) {
    formData.append('removeImage', 'true');
  }

  if (isLocalImageUri(values.imageUri)) {
    formData.append('image', {
      uri: values.imageUri,
      type: 'image/jpeg',
      name: `plot_${Date.now()}.jpg`,
    } as any);
  }

  return formData;
};

const usePlotForm = (editingPlot?: any) => {
  const [values, setValues] = useState<PlotFormValues>(DEFAULT_VALUES);

  useEffect(() => {
    if (editingPlot) {
      setValues(getPlotValues(editingPlot));
    }
  }, [editingPlot]);

  const amenities = useMemo<AmenitiesForm>(
    () => ({
      parkDistance: values.parkDistance,
      schoolDistance: values.schoolDistance,
      hospitalDistance: values.hospitalDistance,
      marketDistance: values.marketDistance,
    }),
    [
      values.parkDistance,
      values.schoolDistance,
      values.hospitalDistance,
      values.marketDistance,
    ],
  );

  const updateField = <Key extends keyof PlotFormValues>(
    key: Key,
    value: PlotFormValues[Key],
  ) => {
    setValues(previous => ({
      ...previous,
      [key]: value,
    }));
  };

  const updateAmenity = (key: keyof AmenitiesForm, value: string) => {
    updateField(key, value);
  };

  const resetForm = () => {
    setValues(DEFAULT_VALUES);
  };

  return {
    values,
    amenities,
    updateField,
    updateAmenity,
    resetForm,
  };
};

export default usePlotForm;
