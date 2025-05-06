// useProductStore.js
import { create } from "zustand";

const useProductStore = create((set) => ({
  // Product state
  products: [],
  setProducts: (newProducts) =>
    set(() => ({
      products: Array.isArray(newProducts) ? [...newProducts] : [],
    })),

  // Cart state
  cartItems: [],
  addProductToCart: (product, indx) =>
    set((state) => ({
      cartItems: [
        ...state.cartItems,
        {
          ...product,
          id: indx,
          quantity: 1,
          total_price: product.price,
        },
      ],
    })),
  removeProductFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  incrementItemQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
            total_price: (item.quantity + 1) * item.price,
          }
          : item
      ),
    })),

  decrementItemQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
              total_price: (item.quantity - 1) * item.price,
            }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // Order confirmation
  confirmOrder: false,
  toggleConfirmOrder: () =>
    set((state) => ({ confirmOrder: !state.confirmOrder })),

  // Reset everything
  startNewOrder: () =>
    set(() => ({
      cartItems: [],
      confirmOrder: false,
    })),
}));

export default useProductStore;
