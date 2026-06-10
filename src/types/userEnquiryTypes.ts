// src/types/userEnquiryTypes.ts

export interface Plot {
  _id: string;

  plotNumber: string;

  title: string;

  location: string;

  price: number;

  area: number;

  images: string[];
}

export interface UserEnquiry {
  _id: string;

  enquiryId: string;

  status:
    | 'New'
    | 'In Progress'
    | 'Pending'
    | 'Closed'
    | 'Cancelled';

  createdAt: string;

  plotId: Plot;
}