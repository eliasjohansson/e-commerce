import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore, useActions } from 'easy-peasy';
import Button from '../components/Button';
import { navigate, Redirect, Link } from '@reach/router';

const StyledAccount = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const OrderList = styled.div`
  padding-bottom: 1rem;

  > div {
    background-color: ${({ theme }) => theme.colorOffWhite};
    padding: 1rem;
    margin-bottom: 1rem;

    > div {
      display: flex;
      justify-content: space-between;
    }
    ul {
      padding-top: 1rem;
      padding-left: 1rem;
      li {
        padding: 0.5rem 0;
      }
    }
  }
`;

const Account = props => {
  const {
    isAuthenticated,
    isLoading,
    authenticatedUser,
    accessToken
  } = useStore(state => state.auth);
  const { logout } = useActions(actions => actions.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URI}/orders`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setOrders(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrders();
  }, []);

  if (!isLoading && !isAuthenticated) return <Redirect to="/" noThrow />;

  return (
    <StyledAccount>
      <Link to="/">Go back home</Link>
      <h1 style={{ marginTop: '1rem' }}>
        Account - {isAuthenticated && authenticatedUser.username}
      </h1>
      <h2>Orders</h2>
      <OrderList>
        {orders.length > 0 ? (
          orders.map(order => {
            const totalPrice = order.products.reduce((a, c) => {
              return a + c.price * c.quantity;
            }, 0);

            return (
              <div key={order.id}>
                <div>
                  <b>{order.createdAt}</b>
                  <b>${totalPrice}</b>
                </div>
                <ul>
                  {order.products.map(product => (
                    <li key={product.id}>
                      {product.quantity} x {product.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <p>No orders has been made on this account</p>
        )}
      </OrderList>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </StyledAccount>
  );
};

export default Account;
