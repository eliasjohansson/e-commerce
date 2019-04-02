import React from 'react';
import styled from 'styled-components';
import ProductListItem from '../../components/ProductListItem';

const StyledProducts = styled.div``;

const Products = props => {
  return (
    <StyledProducts>
      <h1>Products</h1>
      <ProductListItem />
      <ProductListItem />
      <ProductListItem />
    </StyledProducts>
  );
};

export default Products;
