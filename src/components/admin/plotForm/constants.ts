import { PlotStatus } from './types';

export const PRIMARY = '#0E8F4B';

export const AMENITIES = [
  {
    key: 'parkDistance',
    title: 'Park',
    icon: 'map-pin',
    color: '#16A34A',
    placeholder: '200 m',
  },
  {
    key: 'schoolDistance',
    title: 'School',
    icon: 'book-open',
    color: '#9333EA',
    placeholder: '500 m',
  },
  {
    key: 'hospitalDistance',
    title: 'Hospital',
    icon: 'plus-square',
    color: '#EF4444',
    placeholder: '1.2 km',
  },
  {
    key: 'marketDistance',
    title: 'Market',
    icon: 'shopping-cart',
    color: '#F97316',
    placeholder: '800 m',
  },
] as const;

export const PLOT_STATUSES: Array<{
  label: PlotStatus;
  color: string;
}> = [
  {
    label: 'Available',
    color: PRIMARY,
  },
  {
    label: 'Booked',
    color: '#F97316',
  },
  {
    label: 'Sold',
    color: '#EF4444',
  },
];
