import apiInstance from './apiInstance';

export interface EnquiryData {
  _id?: string;

  name: string;

  mobile: string;

  email?: string;

  message?: string;

  plotTitle: string;

  plotLocation: string;

  plotPrice: string;

  status?: 'New' | 'Contacted' | 'Closed';

  createdAt?: string;

  updatedAt?: string;
}

// CREATE ENQUIRY
export const addEnquiryAPI =
  async (data: EnquiryData) => {
    try {
      const response =
        await apiInstance.post(
          '/enquiries/create',
          data,
        );

      return response.data;
    } catch (error: any) {
      console.log(
        'CREATE ENQUIRY ERROR:',
        error?.response?.data ||
          error.message,
      );

      throw error;
    }
  };

// GET ALL ENQUIRIES
export const getEnquiriesAPI =
  async (
    search: string = '',
    status: string = 'All',
  ) => {
    try {
      const response =
        await apiInstance.get('/enquiries/all', {
          params: {
            search,
            status,
          },
        });

      return response.data;
    } catch (error: any) {
      console.log(
        'GET ENQUIRIES ERROR:',
        error?.response?.data ||
          error.message,
      );

      throw error;
    }
  };
// GET SINGLE ENQUIRY
export const getSingleEnquiryAPI =
  async (id: string) => {
    try {
      const response =
        await apiInstance.get(`/enquiries/${id}`);

      return response.data;
    } catch (error: any) {
      console.log(
        'GET SINGLE ENQUIRY ERROR:',
        error?.response?.data ||
          error.message,
      );

      throw error;
    }
  };

// UPDATE ENQUIRY STATUS
export const updateEnquiryStatusAPI =
  async (
    id: string,
    status:
      | 'New'
      | 'Contacted'
      | 'Closed',
  ) => {
    try {
      const response =
        await apiInstance.patch(
          `/enquiries/${id}/status`,
          {
            status,
          },
        );

      return response.data;
    } catch (error: any) {
      console.log(
        'UPDATE STATUS ERROR:',
        error?.response?.data ||
          error.message,
      );

      throw error;
    }
  };

// DELETE ENQUIRY
export const deleteEnquiryAPI =
  async (id: string) => {
    try {
      const response =
        await apiInstance.delete(
          `/enquiries/${id}`,
        );

      return response.data;
    } catch (error: any) {
      console.log(
        'DELETE ENQUIRY ERROR:',
        error?.response?.data ||
          error.message,
      );

      throw error;
    }
  };

// SEARCH ENQUIRIES
export const searchEnquiriesAPI =
  async (
    keyword: string,
  ) => {
    try {
      const response =
        await apiInstance.get(
          `/enquiries/search/${keyword}`,
        );

      return response.data;
    } catch (error: any) {
      console.log(
        'SEARCH ENQUIRIES ERROR:',
        error?.response?.data ||
          error.message,
      );

      throw error;
    }
  };


// USER ENQUIRIES

export const getUserEnquiriesAPI =
  async (userId: string) => {
    try {
      const response =
        await apiInstance.get(
          `/enquiries/user/${userId}`,
        );

      return response.data;
    } catch (error: any) {
      console.log(
        'GET USER ENQUIRIES ERROR:',
        error?.response?.data ||
          error.message,
      );

      throw error;
    }
  };
