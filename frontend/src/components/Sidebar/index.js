import React, { useState } from 'react';
import styled from 'styled-components';
import { MdChevronLeft } from 'react-icons/md';
import { Expand, Checkout } from './Buttons';
import Cart from './Cart';
import Header from './Header';

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 372px;
  height: 100vh;
  z-index: 1000;
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
  const [expanded, setExpanded] = useState(true);

  return (
    <StyledSidebar expanded={expanded}>
      <Header>
        <Expand expanded={expanded} onClick={() => setExpanded(!expanded)} />
        <Checkout />
      </Header>

      <Cart />
    </StyledSidebar>
  );
};

export default Sidebar;
