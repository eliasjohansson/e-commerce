import React from 'react';
import styled, { css } from 'styled-components';
import { MdChevronLeft, MdShoppingCart } from 'react-icons/md';

const sharedStyle = css`
  width: 72px;
  height: 72px;
  font-size: 2.5rem;
  border: none;
  background-color: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  cursor: pointer;
`;

// EXPAND ===========================================================
const StyledExpand = styled.button`
  ${sharedStyle}
  transition: 0.3s ease;

  transform: ${({ expanded }) =>
    expanded ? 'rotateY(180deg)' : 'rotateY(0deg)'};

  &:hover {
    background-color: ${({ theme }) => theme.colorOffWhite};
  }
`;

export const Expand = props => (
  <StyledExpand {...props}>
    <MdChevronLeft />
  </StyledExpand>
);

// CHECKOUT =========================================================
const StyledCheckout = styled.div`
  ${sharedStyle}
  width: auto;
  font-size: 1rem;
  padding: 0 ${({ theme }) => theme.spacingM};
  border-bottom: 0;
  span {
    /*   margin-right: 10px; */
  }

  &:hover {
    background-color: ${({ theme }) => theme.colorOffWhite};
  }
`;

export const Checkout = props => (
  <StyledCheckout>
    <span>Checkout</span>
    {/* <MdShoppingCart /> */}
  </StyledCheckout>
);
