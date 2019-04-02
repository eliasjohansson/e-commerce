import React from 'react';
import styled from 'styled-components';

const StyledProductListItem = styled.div`
  background-color: ${({ theme }) => theme.colorWhite};

  > div {
    padding: ;
  }
`;

const ProductListItem = ({ product: { name, price, image } }) => {
  return (
    <StyledProductListItem>
      <img src={image} alt="" />
      <div>
        <h3>{name}</h3>
        <span>{price} kr</span>
      </div>
    </StyledProductListItem>
  );
};

export default ProductListItem;
