// src/data/plotsData.ts

export interface AmenityType {
  title: string;
  distance: string;
  icon: string;
}

export interface PlotType {
  id: string;
  title: string;
  location: string;
  sector: string;
  size: string;
  price: string;
  status: 'Available' | 'Booked' | 'Sold';
  image: any;
  facing: string;
  dimension: string;
  description: string;
  amenities: AmenityType[];
}

export const plotsData: PlotType[] = [
  {
    id: '1',
    title: 'Plot # A-101',
    location: 'Green View City',
    sector: 'Sector 1',
    size: '1200 sq.ft',
    price: '₹ 24,00,000',
    status: 'Available',
    facing: 'East Facing',
    dimension: '30 x 40',
    image: require('../assets/images/plots/plot1.png'),


    description:
      'Premium plot located in a gated community with wide roads, park nearby and all modern amenities.',

    amenities: [
      {
        title: 'Park',
        distance: '200 m',
        icon: 'map',
      },
      {
        title: 'School',
        distance: '500 m',
        icon: 'book-open',
      },
      {
        title: 'Hospital',
        distance: '1.2 km',
        icon: 'plus-square',
      },
      {
        title: 'Market',
        distance: '800 m',
        icon: 'shopping-cart',
      },
    ],
  },

  {
    id: '2',
    title: 'Plot # B-205',
    location: 'Green View City',
    sector: 'Sector 2',
    size: '1500 sq.ft',
    price: '₹ 30,00,000',
    status: 'Available',
    facing: 'North Facing',
    dimension: '30 x 50',
     image: require('../assets/images/plots/plot2.png'),

    description:
      'Spacious premium plot with wide internal roads, nearby school, hospital and modern infrastructure.',

    amenities: [
      {
        title: 'Park',
        distance: '300 m',
        icon: 'map',
      },
      {
        title: 'School',
        distance: '400 m',
        icon: 'book-open',
      },
      {
        title: 'Hospital',
        distance: '1 km',
        icon: 'plus-square',
      },
      {
        title: 'Market',
        distance: '600 m',
        icon: 'shopping-cart',
      },
    ],
  },

  {
    id: '3',
    title: 'Plot # C-309',
    location: 'Green View City',
    sector: 'Sector 3',
    size: '1800 sq.ft',
    price: '₹ 36,00,000',
    status: 'Available',
    facing: 'West Facing',
    dimension: '40 x 45',
    image: require('../assets/images/plots/plot3.png'),

    description:
      'Luxury residential plot surrounded by greenery with excellent road connectivity and amenities.',

    amenities: [
      {
        title: 'Park',
        distance: '150 m',
        icon: 'map',
      },
      {
        title: 'School',
        distance: '700 m',
        icon: 'book-open',
      },
      {
        title: 'Hospital',
        distance: '900 m',
        icon: 'plus-square',
      },
      {
        title: 'Market',
        distance: '500 m',
        icon: 'shopping-cart',
      },
    ],
  },

  {
    id: '4',
    title: 'Plot # D-112',
    location: 'Green Valley Township, bengaluru',
    sector: 'Sector 4',
    size: '2400 sq.ft',
    price: '₹ 48,00,000',
    status: 'Booked',
    facing: 'South Facing',
    dimension: '40 x 60',
   image: require('../assets/images/plots/plot1.png'),


    description:
      'Large premium corner plot with excellent investment value and modern gated community facilities.',

    amenities: [
      {
        title: 'Park',
        distance: '100 m',
        icon: 'map',
      },
      {
        title: 'School',
        distance: '600 m',
        icon: 'book-open',
      },
      {
        title: 'Hospital',
        distance: '1.5 km',
        icon: 'plus-square',
      },
      {
        title: 'Market',
        distance: '700 m',
        icon: 'shopping-cart',
      },
    ],
  },

  {
    id: '5',
    title: 'Plot # E-450',
    location: 'Palm Meadows',
    sector: 'Sector 5',
    size: '1000 sq.ft',
    price: '₹ 20,00,000',
    status: 'Available',
    facing: 'East Facing',
    dimension: '25 x 40',
      image: require('../assets/images/plots/plot2.png'),

    description:
      'Affordable residential plot suitable for villa construction with all essential facilities nearby.',

    amenities: [
      {
        title: 'Park',
        distance: '250 m',
        icon: 'map',
      },
      {
        title: 'School',
        distance: '350 m',
        icon: 'book-open',
      },
      {
        title: 'Hospital',
        distance: '1 km',
        icon: 'plus-square',
      },
      {
        title: 'Market',
        distance: '450 m',
        icon: 'shopping-cart',
      },
    ],
  },

  {
    id: '6',
    title: 'Plot # F-620',
    location: 'Palm Meadows',
    sector: 'Sector 6',
    size: '2000 sq.ft',
    price: '₹ 40,00,000',
    status: 'Sold',
    facing: 'North-East Facing',
    dimension: '40 x 50',
    image: require('../assets/images/plots/plot3.png'),

    description:
      'Premium sold-out plot in a high-demand area with excellent appreciation value.',

    amenities: [
      {
        title: 'Park',
        distance: '180 m',
        icon: 'map',
      },
      {
        title: 'School',
        distance: '500 m',
        icon: 'book-open',
      },
      {
        title: 'Hospital',
        distance: '1.1 km',
        icon: 'plus-square',
      },
      {
        title: 'Market',
        distance: '650 m',
        icon: 'shopping-cart',
      },
    ],
  },
];