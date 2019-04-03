import React, { useState } from 'react';
import styled from 'styled-components';
import { MdChevronLeft } from 'react-icons/md';
import { Expand, Checkout, Login, TextButton } from './Buttons';
import Cart from './Cart';
import Header from './Header';
import { useStore, useActions } from 'easy-peasy';
import Footer from './Footer';
import { navigate } from '@reach/router';

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 372px;
  height: 100vh;
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  transform: ${({ expanded }) =>
    expanded ? 'translateX(0px)' : 'translateX(300px)'};
  transition: transform 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colorWhite};
`;

const Sidebar = props => {
  const { products, id } = useStore(state => state.cart);
  const { isAuthenticated, authenticatedUser } = useStore(state => state.auth);
  const { setModalOpen } = useActions(actions => actions.auth);
  const [expanded, setExpanded] = useState(false);

  const totalPrice = products.reduce((a, c) => {
    return a + c.price * c.quantity;
  }, 0);

  return (
    <StyledSidebar expanded={expanded}>
      <Header>
        <Expand expanded={expanded} onClick={() => setExpanded(!expanded)} />
        {isAuthenticated ? (
          <TextButton onClick={() => navigate('/account')}>
            {authenticatedUser.username}
          </TextButton>
        ) : (
          <TextButton onClick={() => setModalOpen(true)}>Login</TextButton>
        )}
      </Header>

      <Cart expanded={expanded} />

      <Footer
        expanded={expanded}
        close={() => setExpanded(false)}
        cartId={id}
        totalPrice={totalPrice}
      />
    </StyledSidebar>
  );
};

export default Sidebar;
