import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductListItem from '../../components/ProductListItem';

const StyledProducts = styled.div``;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${({ theme }) => theme.spacingM};
`;

const Products = props => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URI}/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <StyledProducts>
      <h1>Products</h1>
      <ProductList>
        {products &&
          products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
      </ProductList>
    </StyledProducts>
  );
};

export default Products;
