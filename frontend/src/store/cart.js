import { thunk, action } from 'easy-peasy';

const cartStore = {
  id: localStorage.getItem('cart_id') || null,
  products: [],

  clearCart: action((state, payload) => {
    state.id = null;
    state.products = [];
    localStorage.removeItem('cart_id');
  }),

  setId: action((state, payload) => {
    state.id = payload;
  }),

  setProducts: action((state, payload) => {
    const existingMatchIndex = state.products.findIndex(
      product => product.id === payload.id
    );

    if (existingMatchIndex !== -1) {
      if (payload.quantity === 0) {
        state.products.splice(existingMatchIndex, 1);
      } else {
        state.products[existingMatchIndex].quantity = payload.quantity;
      }
    } else {
      state.products = [...state.products, payload];
    }
  }),

  fetchCart: thunk(async (actions, payload, { getState }) => {
    const { id } = getState();
    if (id) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URI}/carts/${id}`);
        const data = await res.json();
        data.products.forEach(product => {
          actions.setProducts(product);
        });
      } catch (e) {
        localStorage.removeItem('cart_id');
      }
    }
  }),

  addProduct: thunk(async (actions, payload, { getState }) => {
    const { id } = getState();

    let cartId;

    if (!id) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URI}/carts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({})
        });
        cartId = await res.json();
        actions.setId(cartId);
        localStorage.setItem('cart_id', cartId);
      } catch (e) {
        console.log(e);
      }
    }

    const body = {
      productId: payload
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URI}/carts/${id || cartId}/products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(body)
        }
      );
      const data = await res.json();
      actions.setProducts(data);
    } catch (e) {
      console.log(e);
    }
  }),

  removeProduct: thunk(async (actions, payload, { getState }) => {
    const { id } = getState();
    if (id) {
      const body = {
        productId: payload
      };

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URI}/carts/${id}/products`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(body)
          }
        );
        const data = await res.json();
        actions.setProducts(data);
      } catch (e) {
        console.log(e);
      }
    }
  })
};

export default cartStore;
