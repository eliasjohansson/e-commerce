import React from 'react';
import styled from 'styled-components';
import Products from './Products';
import SingleProduct from './SingleProduct';
import { Router } from '@reach/router';

const StyledHome = styled.div``;

const Home = props => {
  return (
    <StyledHome>
      <Router>
        <Products path="/" />
        <Products path="/products" />
        <SingleProduct path="products/:productId" />
      </Router>
    </StyledHome>
  );
};

export default Home;
