import apiInstance from './apiInstance';

export interface PlotPayload {
  title: string;
  location: string;
  sector: string;
  size: string;
  price: string;
  status: 'Available' | 'Booked' | 'Sold';
  image?: string;
}

export interface Plot {
  _id: string;
  title: string;
  location: string;
  sector: string;
  size: string;
  price: string;
  status: 'Available' | 'Booked' | 'Sold';
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * GET ALL PLOTS
 */

export const getPlotsAPI = async () => {
  try {
    const response =
      await apiInstance.get(
        '/plots/all-plots',
      );

    return response.data;
  } catch (error: any) {
    console.log(
      'GET PLOTS ERROR:',
      error?.response?.data ||
        error.message,
    );
    throw error;
  }
};
/**
 * GET SINGLE PLOT
 */
export const getSinglePlotAPI = async (
  id: string,
) => {
  try {
    const response =
      await apiInstance.get(
        `/plots/${id}`,
      );

    return response.data;
  } catch (error: any) {
    console.log(
      'GET SINGLE PLOT ERROR:',
      error?.response?.data ||
        error.message,
    );
    throw error;
  }
};

/**
 * ADD NEW PLOT
 */
export const addPlotAPI = async (
  data: any,
) => {
  try {
    const response =
      await apiInstance.post(
        '/plots/add-plot',
        data,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        },
      );

    return response.data;
  } catch (error: any) {
    console.log(
      'ADD PLOT ERROR:',
      error?.response?.data ||
        error.message,
    );
    throw error;
  }
};

/**
 * UPDATE PLOT
 */
export const updatePlotAPI = async (
  id: string,
  data: PlotPayload,
) => {
  try {
    const response =
      await apiInstance.put(
        `/plots/${id}`,
        data,
      );

    return response.data;
  } catch (error: any) {
    console.log(
      'UPDATE PLOT ERROR:',
      error?.response?.data ||
        error.message,
    );
    throw error;
  }
};

/**
 * UPDATE PLOT STATUS
 */
export const updatePlotStatusAPI =
  async (
    id: string,
    status:
      | 'Available'
      | 'Booked'
      | 'Sold',
  ) => {
    try {
      const response =
        await apiInstance.patch(
          `/plots/${id}/status`,
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

/**
 * DELETE PLOT
 */
export const deletePlotAPI = async (
  id: string,
) => {
  try {
    const response =
      await apiInstance.delete(
        `/plots/${id}`,
      );

    return response.data;
  } catch (error: any) {
    console.log(
      'DELETE PLOT ERROR:',
      error?.response?.data ||
        error.message,
    );
    throw error;
  }
};
