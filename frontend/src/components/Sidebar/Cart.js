import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useActions, useStore } from 'easy-peasy';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  width: 100%;

  /* This fires as soon as the element enters the dorm */
  .list-transition-enter {
    /*We give the list the initial dimension of the list button*/
    transform: translateX(${({ expanded }) => (expanded ? '372px' : '72px')});
  }
  /* This is where we can add the transition*/
  .list-transition-enter-active {
    transform: translateX(0px);
  }
  /* This fires as soon as the this.state.showList is false */
  .list-transition-exit {
    transform: translateX(0px);
  }
  /* fires as element leaves the DOM*/
  .list-transition-exit-active {
    transform: translateX(${({ expanded }) => (expanded ? '372px' : '72px')});
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacingS};
  padding-left: 11px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease-in-out;

  > div:first-child {
    margin-right: ${({ theme }) => theme.spacingL};
    width: 50px;
    height: 50px;
    position: relative;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    span {
      width: 22px;
      height: 22px;
      display: flex;

      font-family: 'Roboto Mono', monospace;
      font-size: 12px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.colorSecondary};
      color: ${({ theme }) => theme.colorWhite};
      position: absolute;
      top: -5px;
      left: -5px;
      transform: ${({ sidebarExpanded }) =>
        sidebarExpanded
          ? 'translate3d(10px, 10px, 0px) scale(0)'
          : 'translate3d(0px, 0px, 0px) scale(1)'};
      transition: all 0.3s ease;
    }
  }

  > div:last-child {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin: 0;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const QuantityEdit = styled.div`
  display: flex;
  align-items: center;

  span {
    padding: 0 ${({ theme }) => theme.spacingM};
  }
  button {
    border: none;
    background-color: ${({ theme }) => theme.colorSecondary};
    color: ${({ theme }) => theme.colorWhite};
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Cart = ({ expanded }) => {
  const { products } = useStore(state => state.cart);
  const { fetchCart, removeProduct, addProduct } = useActions(
    actions => actions.cart
  );

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <StyledCart expanded={expanded}>
      <TransitionGroup component={null}>
        {products.length > 0 &&
          products.map(product => (
            <CSSTransition
              key={product.id}
              timeout={500}
              classNames="list-transition"
              unmountOnExit
            >
              <CartItem sidebarExpanded={expanded} key={product.id}>
                <div>
                  <img src={product.image} alt="" />
                  {product.quantity > 1 && <span>{product.quantity}</span>}
                </div>
                <div>
                  <p>{product.name}</p>
                  <QuantityEdit>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        removeProduct(product.id);
                      }}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        addProduct(product.id);
                      }}
                    >
                      +
                    </button>
                  </QuantityEdit>
                </div>
              </CartItem>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledCart>
  );
};

export default Cart;
