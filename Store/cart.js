import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartId: "thisisacartid",
  navFrom: "",
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    resetCart: (state, action) => {
      state.cart = [];
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setNavFrom: (state, action) => {
      state.navFrom = action.payload;
    },
    setGTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  resetCart,
  setCartId,
  setNavFrom,
  setGTotalPrice
} = cartSlice.actions;

export default cartSlice.reducer;
