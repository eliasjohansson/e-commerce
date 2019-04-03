import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, navigate, Link } from '@reach/router';
import Button from '../../components/Button';
import { useActions } from 'easy-peasy';

const StyledSingleProduct = styled.div`
  > div {
    display: flex;
    img {
      width: 300px;
      height: 300px;
    }
    > div {
      flex: 1;
      padding: 0 ${({ theme }) => theme.spacingL};
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      p {
        padding-bottom: ${({ theme }) => theme.spacingXL};
        margin-bottom: auto;
      }
      span {
        font-size: 4rem;
        align-self: flex-end;
        margin-bottom: ${({ theme }) => theme.spacingM};
      }
    }
  }
`;

const SingleProduct = props => {
  const [product, setProduct] = useState(null);
  const { addProduct } = useActions(actions => actions.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URI}/products/${props.productId}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        navigate('/');
      }
    };
    fetchProduct();
  }, []);

  return (
    <StyledSingleProduct>
      {product && (
        <>
          <Link to="/">Back to products</Link>
          <h1>{product.name}</h1>
          <div>
            <img src={product.image} alt="" />
            <div>
              <p>{product.description}</p>
              <span>${product.price}</span>
              <Button
                onClick={e => {
                  e.preventDefault();
                  addProduct(product.id);
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </>
      )}
    </StyledSingleProduct>
  );
};

export default SingleProduct;
