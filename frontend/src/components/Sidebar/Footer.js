import React from 'react';
import styled from 'styled-components';
import { Checkout } from './Buttons';
import { navigate } from '@reach/router';

const StyledFooter = styled.div`
  display: flex;
  height: 72px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-between;

  span {
    transform: ${({ expanded }) =>
      expanded ? 'translateX(0px)' : 'translateX(56px)'};
    transition: 0.3s ease;
    height: 100%;
    padding: 0 ${({ theme }) => theme.spacingM};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
`;

const Footer = ({ totalPrice, cartId, expanded, close }) => {
  return (
    <StyledFooter expanded={expanded}>
      {cartId && totalPrice > 0 && (
        <>
          <span>${totalPrice.toFixed(2)}</span>
          <Checkout
            onClick={e => {
              navigate(`/order`);
              close();
            }}
          />
        </>
      )}
    </StyledFooter>
  );
};

export default Footer;
