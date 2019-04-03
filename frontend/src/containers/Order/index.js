import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Router, Redirect } from '@reach/router';
import OrderForm from './Form';
import OrderConfirm from './Confirm';
import { useStore, useActions } from 'easy-peasy';
import { navigate } from '@reach/router/lib/history';

const StyledOrder = styled.div`
  max-width: 800px;
  min-height: 100%;
  margin: 0 auto;
`;

const Order = props => {
  const { products, id } = useStore(state => state.cart);
  const { fetchCart } = useActions(actions => actions.cart);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <StyledOrder>
      {!orderInfo ? (
        <OrderForm cartId={id} setOrderInfo={setOrderInfo} />
      ) : (
        <OrderConfirm orderInfo={orderInfo} />
      )}
    </StyledOrder>
  );
};

export default Order;
