import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
import currencyReducer from './currency'
import useReducer from './user'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
    user: useReducer
    
  },
})