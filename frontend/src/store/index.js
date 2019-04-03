import { createStore } from 'easy-peasy';
import authStore from './auth';
import cartStore from './cart';

const store = createStore({
  auth: authStore,
  cart: cartStore
});

export default store;
