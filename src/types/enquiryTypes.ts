export interface Plot {
  _id: string;
  plotNumber: string;
  title: string;
  location: string;
  price: number;
  area: number;
  images: string[];
}

export type EnquiryStatus =
  | 'New'
  | 'In Progress'
  | 'Pending'
  | 'Closed'
  | 'Cancelled';

export interface Enquiry {
  _id: string;
  enquiryId: string;
  status: EnquiryStatus;
  createdAt: string;
  plotId: Plot;
}

export interface EnquiryResponse {
  success: boolean;
  count: number;
  enquiries: Enquiry[];
}