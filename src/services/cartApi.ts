import {apiSlice} from './apiSlice';

export interface CartPayload {
  userId: string;
  plotId: string;
}

export const cartApi =
  apiSlice.injectEndpoints({
    endpoints: builder => ({
      getCart: builder.query({
        query: (userId: string) =>
          `/cart/${userId}`,

        providesTags: ['Cart'],
      }),

      addToCart: builder.mutation<
        any,
        CartPayload
      >({
        query: body => ({
          url: '/cart/add',
          method: 'POST',
          body,
        }),

        invalidatesTags: ['Cart'],
      }),

      removeCart: builder.mutation({
        query: (cartId: string) => ({
          url: `/cart/remove/${cartId}`,
          method: 'DELETE',
        }),

        invalidatesTags: ['Cart'],
      }),

      clearCart: builder.mutation({
        query: (userId: string) => ({
          url: `/cart/clear/${userId}`,
          method: 'DELETE',
        }),

        invalidatesTags: ['Cart'],
      }),
    }),
  });

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveCartMutation,
  useClearCartMutation,
} = cartApi;