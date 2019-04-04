import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { useStore, useActions } from 'easy-peasy';
import { Link } from '@reach/router';

const StyledOrderConfirm = styled.div`
  margin-top: 1rem;
  > h3 {
    color: darkgreen;
  }
`;

const OrderSummary = styled.div`
  margin-bottom: 2rem;
  h3 {
    margin: 2rem 0 1rem 0;
  }

  ul {
    margin: 1rem 0;

    li {
      padding: 0.5rem 0;
    }
  }

  > b {
    font-size: 2rem;
  }
`;

const OrderConfirm = ({ orderInfo, completedOrder }) => {
  const { products } = useStore(state => state.cart);
  const { isAuthenticated, accessToken } = useStore(state => state.auth);
  const { clearCart } = useActions(actions => actions.cart);
  const [completed, setCompleted] = useState(false);
  const totalPrice = products.reduce((a, c) => {
    return a + c.price * c.quantity;
  }, 0);

  return (
    <StyledOrderConfirm>
      <h1>Confirm Order</h1>

      <OrderSummary>
        <h3>Products</h3>
        <div>
          <ul>
            {products.map(product => (
              <li>
                {product.quantity} x {product.name}
              </li>
            ))}
          </ul>
          <h3>Shipping Info</h3>
          <ul>
            <li>
              Name: <b>{orderInfo.customerName}</b>
            </li>
            <li>
              Email: <b>{orderInfo.customerEmail}</b>
            </li>
            <li>
              Country: <b>{orderInfo.shippingCountry}</b>
            </li>
            <li>
              City: <b>{orderInfo.shippingCity}</b>
            </li>
            <li>
              Address: <b>{orderInfo.shippingAddress}</b>
            </li>
            <li>
              Zipcode: <b>{orderInfo.shippingZipcode}</b>
            </li>
          </ul>
        </div>

        <b>${totalPrice.toFixed(2)}</b>
      </OrderSummary>

      {!completed ? (
        <Button
          onClick={async () => {
            try {
              console.log(orderInfo);
              const res = await fetch(
                `${process.env.REACT_APP_API_URI}/orders/${
                  !isAuthenticated ? 'guest' : ''
                }`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                  },
                  body: JSON.stringify(orderInfo)
                }
              );
              const data = await res.json();
              clearCart();
              setCompleted(true);
              console.log(data);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Complete Order
        </Button>
      ) : (
        <>
          <h3>Order Completed</h3>
          <Link to="/">Go to products</Link>
        </>
      )}
    </StyledOrderConfirm>
  );
};

export default OrderConfirm;
