import React, {
  useMemo,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  useSelector,
} from 'react-redux';

import {RootState} from '../redux/store';

import CartItem from '../components/CartItem';

import CartSummary from '../components/CartSummary';

import {
  useGetCartQuery,
  useRemoveCartMutation,
  useClearCartMutation,
} from '../services/cartApi';

const CartScreen = () => {
  const navigation =
    useNavigation<any>();

  const userId =
    useSelector(
      (
        state: RootState,
      ) =>
        state.user.user?._id,
    );

  const {
    data,
    isLoading,
  } =
    useGetCartQuery(
       userId ?? '',
      {
        skip:
          !userId,
      },
    );

  const [
    removeCart,
  ] =
    useRemoveCartMutation();

  const [clearCart] =
    useClearCartMutation();

  const cartItems =
    data?.data || [];

  const subtotal =
    useMemo(() => {
      return cartItems.reduce(
        (
          total: number,
          item: any,
        ) =>
          total +
          Number(
            item.plotId
              ?.price ||
              0,
          ),
        0,
      );
    }, [cartItems]);

  const handleClearCart =
     async () => {
    if (!userId) {
      return;
    }

      try {
        await clearCart(
          userId,
        ).unwrap();
      } catch (
        error
      ) {
        console.log(
          error,
        );
      }
    };

  if (isLoading) {
    return (
      <View
        style={
          styles.loaderContainer
        }>
        <ActivityIndicator
          size="large"
          color="#16A34A"
        />
      </View>
    );
  }

  return (
    <View
      style={
        styles.container
      }>
      {/* Header */}

      <View
        style={
          styles.header
        }>
        <TouchableOpacity
          style={
            styles.backButton
          }
          onPress={() =>
            navigation.goBack()
          }>
          <Feather
            name="arrow-left"
            size={22}
            color="#000"
          />
        </TouchableOpacity>

        <Text
          style={
            styles.title
          }>
          My Cart
        </Text>

        <TouchableOpacity
          onPress={
            handleClearCart
          }>
          <Text
            style={
              styles.clearText
            }>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cart List */}

      <FlatList
        data={cartItems}
        keyExtractor={item =>
          item._id
        }
        renderItem={({
          item,
        }) => (
          <CartItem
            item={item}
            onRemove={
              removeCart
            }
          />
        )}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ListEmptyComponent={() => (
          <View
            style={
              styles.emptyContainer
            }>
            <Feather
              name="shopping-cart"
              size={60}
              color="#D1D5DB"
            />

            <Text
              style={
                styles.emptyText
              }>
              Your cart is
              empty
            </Text>
          </View>
        )}
      />

      {/* Summary */}

      {cartItems.length >
        0 && (
        <>
          <CartSummary
            subtotal={
              subtotal
            }
          />

          <TouchableOpacity
            style={
              styles.button
            }>
            <Text
              style={
                styles.btnText
              }>
              Proceed To
              Booking
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F7F8FA',
      padding: 15,
    },

    loaderContainer:
      {
        flex: 1,
        justifyContent:
          'center',
        alignItems:
          'center',
      },

    header: {
      flexDirection:
        'row',

      alignItems:
        'center',

      justifyContent:
        'space-between',

      marginBottom: 20,
    },

    backButton: {
      width: 42,

      height: 42,

      borderRadius: 12,

      backgroundColor:
        '#FFF',

      justifyContent:
        'center',

      alignItems:
        'center',

      elevation: 2,
    },

    title: {
      fontSize: 22,

      fontWeight:
        '700',

      color: '#111827',
    },

    clearText: {
      color: '#EF4444',

      fontWeight:
        '600',
    },

    emptyContainer:
      {
        flex: 1,
        justifyContent:
          'center',
        alignItems:
          'center',
        marginTop: 80,
      },

    emptyText: {
      marginTop: 12,

      fontSize: 16,

      color: '#6B7280',
    },

    button: {
      backgroundColor:
        '#16A34A',

      padding: 16,

      borderRadius: 12,

      alignItems:
        'center',

      marginTop: 15,
    },

    btnText: {
      color: '#FFF',

      fontWeight:
        '700',

      fontSize: 16,
    },
  });