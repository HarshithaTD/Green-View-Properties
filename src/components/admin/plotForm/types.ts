export type PlotStatus = 'Available' | 'Booked' | 'Sold';

export type AmenitiesForm = {
  parkDistance: string;
  schoolDistance: string;
  hospitalDistance: string;
  marketDistance: string;
};

export type PlotFormValues = AmenitiesForm & {
  plotTitle: string;
  township: string;
  sector: string;
  size: string;
  price: string;
  facing: string;
  dimension: string;
  description: string;
  status: PlotStatus;
  imageUri: string | null;
  imageRemoved: boolean;
};
