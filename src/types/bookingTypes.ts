export interface BookingResponse {
  _id: string;

  plot: {
    _id: string;
    title: string;
    location: string;
    size: string;
    price: number;
    image: string;
  };

  buyer: {
    fullName: string;
    mobile: string;
    email: string;
  };

  payment: {
    bookingAmount: number;
    gst: number;
    totalAmount: number;
  };
}