import React from 'react';
import styled from 'styled-components';
import Img from './Img';
import Button from './Button';
import { Link } from '@reach/router';
import { useActions } from 'easy-peasy';

const StyledProductListItem = styled(Link)`
  background-color: ${({ theme }) => theme.colorOffWhite};
  text-decoration: none;
  color: inherit;

  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }

  > div {
    padding: ${({ theme }) => theme.spacingL};
    display: flex;
    flex-direction: column;
  }

  button {
    width: 100%;
  }
`;

const ProductListItem = ({ product: { id, name, price, image } }) => {
  const { addProduct } = useActions(actions => actions.cart);
  return (
    <StyledProductListItem to={`products/${id}`}>
      <img src={image} alt="" />
      <div>
        <h3>{name}</h3>
        <span>${price}</span>
      </div>
      <Button
        onClick={e => {
          e.preventDefault();
          addProduct(id);
        }}
      >
        Add to cart
      </Button>
    </StyledProductListItem>
  );
};

export default ProductListItem;
