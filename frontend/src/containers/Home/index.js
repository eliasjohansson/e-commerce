import React from 'react';
import styled from 'styled-components';
import Products from './Products';
import SingleProduct from './SingleProduct';

const StyledHome = styled.div``;

const Home = props => {
  return (
    <StyledHome>
      <h1>Home</h1>
      <Products path="/" />
      <SingleProduct path="products/:id" />
    </StyledHome>
  );
};

export default Home;
