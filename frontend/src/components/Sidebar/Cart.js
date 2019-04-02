import React from 'react';
import styled from 'styled-components';

const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  width: 100%;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: ${({ theme }) => theme.spacingS};
  padding-left: 11px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);

  > div:first-child {
    margin-right: ${({ theme }) => theme.spacingL};
    width: 50px;
    height: 50px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
  }

  > div:last-child {
    flex: 1;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Cart = props => {
  return (
    <StyledCart>
      <CartItem>
        <div>
          <img
            src="https://images.unsplash.com/photo-1553531768-4ce3fb0b07fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            alt=""
          />
        </div>
        <div>
          <p>Boxed Water</p>
        </div>
      </CartItem>
      <CartItem>
        <div>
          <img
            src="https://images.unsplash.com/photo-1553531768-4ce3fb0b07fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            alt=""
          />
        </div>
        <div>
          <p>Boxed Water</p>
        </div>
      </CartItem>
      <CartItem>
        <div>
          <img
            src="https://images.unsplash.com/photo-1553531768-4ce3fb0b07fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            alt=""
          />
        </div>
        <div>
          <p>Boxed Water</p>
        </div>
      </CartItem>
    </StyledCart>
  );
};

export default Cart;
